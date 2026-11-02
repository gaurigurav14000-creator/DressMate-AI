import os
from urllib.parse import urlparse
import requests
from flask import Flask, request, jsonify, Response
from google import genai
from google.genai import types
import json

app = Flask(__name__)
pixabay_api_key = os.getenv("PIXABAY_API_KEY")
print("Pixabay API Key Loaded:", bool(pixabay_api_key))

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response

@app.route("/")
def home():
    return "AI Fashion Mate Backend is Running!"
@app.route("/search-images", methods=["GET"])
def search_images():
    query = request.args.get("q", "").strip()

    if not query:
        return jsonify({"error": "Search query is required"}), 400

    pixabay_api_key = os.getenv("PIXABAY_API_KEY")

    if not pixabay_api_key:
        return jsonify({"success": False, "error": "Pixabay API key missing"}), 500

    response = requests.get(
        "https://pixabay.com/api/",
        params={
            "key": pixabay_api_key,
            "q": " ".join(query.split()[:4]),
            "image_type": "photo",
            "safesearch": "true",
            "per_page": 6
        },
        timeout=15
    )

    if response.status_code != 200:
        return jsonify({"error": "Image search failed"}), 502

    data = response.json()

    return jsonify({
        "success": True,
        "images": [
            {
                "image": item["largeImageURL"],
                "source": item["pageURL"],
                "tags": item["tags"]
            }
            for item in data.get("hits", [])
        ]
    })
@app.route("/proxy-image", methods=["GET"])
def proxy_image():
    image_url = request.args.get("url", "")

    parsed = urlparse(image_url)

    if parsed.hostname != "pixabay.com" or not parsed.path.startswith("/get/"):
        return "Invalid image URL", 400

    try:
        response = requests.get(image_url, timeout=15)

        if response.status_code != 200:
            return "Image could not be loaded", response.status_code

        return Response(
            response.content,
            content_type=response.headers.get("Content-Type", "image/jpeg")
        )

    except requests.RequestException:
        return "Image request failed", 502
@app.route("/analyze", methods=["POST"])
def analyze_outfit():
    if client is None:
        return jsonify({
            "success": False,
            "error": "Gemini API key not found"
        }), 500

    if "outfit" not in request.files:
        return jsonify({
            "success": False,
            "error": "No outfit image uploaded"
        }), 400

    image_file = request.files["outfit"]

    try:
        image_bytes = image_file.read()

        image_part = types.Part.from_bytes(
            data=image_bytes,
            mime_type=image_file.mimetype or "image/jpeg"
        )

        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=[
                "Analyze this outfit. Give exactly four numbered sections: "
                "1. Style and colours, "
                "2. Suitable occasions, "
                "3. Footwear and accessories, "
                "4. One useful styling tip. "
                "Keep the language simple and concise.",
                image_part
            ]
        )

        return jsonify({
            "success": True,
            "analysis": response.text
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
@app.route("/generate-outfit", methods=["POST"])
def generate_outfit():
    if client is None:
        return jsonify({"success": False, "error": "Gemini API key not found"}), 500

    pixabay_api_key = os.getenv("PIXABAY_API_KEY")

    if not pixabay_api_key:
         return jsonify({"success": False, "error": "Pixabay API key missing"}), 500

    data = request.get_json(silent=True) or {}

    occasion = data.get("occasion", "college")
    colour = data.get("colour", "any")
    clothing_type = data.get("clothing_type", "top-jeans")
    style = data.get("style", "casual")
    budget = data.get("budget", "all")

    prompt = f"""
You are a professional AI fashion stylist.

Create ONE complete outfit using these exact preferences:
Occasion: {occasion}
Preferred colour: {colour}
Clothing type: {clothing_type}
Style: {style}
Budget: {budget}

Respect every selection. Do not change the requested colour,
occasion, clothing type or style.

Return ONLY valid JSON with these exact keys:
{{
  "title": "Short outfit name",
  "top": "Specific top or upper clothing",
  "bottom": "Specific bottom clothing",
  "shoes": "Matching footwear",
  "accessories": "Matching accessories",
  "tip": "One useful styling tip",
  "search_query": "Short English Pixabay photo search query"
}}

Do not include Markdown, prices, brands or extra text.
"""

    
    try:
        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=prompt
        )

        answer = response.text.strip()
        answer = answer.replace("```json", "").replace("```", "").strip()
        outfit = json.loads(answer)

        search_query = f"women {colour} {style} {occasion} {clothing_type} outfit fashion"
        if not search_query:
            search_query = f"{colour} {style} {occasion} fashion outfit"

        image_response = requests.get(
            "https://pixabay.com/api/",
            params={
                "key": pixabay_api_key,
                "q": " ".join(search_query.split()[:8]),
                "image_type": "photo",
                "safesearch": "true",
                "per_page": 3
            },
            timeout=15
        )

        if image_response.status_code != 200:
            return jsonify({
                "success": False,
                "error": f"Pixabay returned status {image_response.status_code}"
            }), 502

        hits = image_response.json().get("hits", [])

        images = [
            {
                "image": item["largeImageURL"],
                "source": item["pageURL"],
                "tags": item["tags"]
            }
            for item in hits
        ]

        return jsonify({
            "success": True,
            "outfit": outfit,
            "images": images
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)