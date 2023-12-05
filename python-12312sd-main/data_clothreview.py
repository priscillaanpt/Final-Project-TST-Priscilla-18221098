from fastapi import FastAPI, HTTPException
import json
from pydantic import BaseModel

app = FastAPI()

class ClothingReview(BaseModel):
    id: int
    product_name: str
    review_text: str

json_filename = "clothing_reviews.json"
try:
    with open(json_filename, "r") as read_file:
        data = json.load(read_file)
except FileNotFoundError:
    data = {"reviews": []}

@app.get('/reviews')
async def read_all_reviews():
    return data['reviews']

@app.get('/reviews/{review_id}')
async def read_review(review_id: int):
    for review in data['reviews']:
        if review['id'] == review_id:
            return review
    raise HTTPException(status_code=404, detail=f'Review not found')

@app.post('/reviews')
async def add_review(review: ClothingReview):
    review_dict = review.dict()
    review_dict['id'] = len(data['reviews']) + 1
    data['reviews'].append(review_dict)
    with open(json_filename, "w") as write_file:
        json.dump(data, write_file)
    return review_dict

@app.put('/reviews/{review_id}')
async def update_review(review_id: int, updated_review: ClothingReview):
    review_dict = updated_review.dict()
    for idx, review in enumerate(data['reviews']):
        if review['id'] == review_id:
            data['reviews'][idx] = review_dict
            with open(json_filename, "w") as write_file:
                json.dump(data, write_file)
            return "Review updated"
    raise HTTPException(status_code=404, detail=f'Review ID not found')

@app.delete('/reviews/{review_id}')
async def delete_review(review_id: int):
    for idx, review in enumerate(data['reviews']):
        if review['id'] == review_id:
            data['reviews'].pop(idx)
            with open(json_filename, "w") as write_file:
                json.dump(data, write_file)
            return "Review deleted"
    raise HTTPException(status_code=404, detail=f'Review ID not found')
