import json
import random


def get_quote():
    """
    Select a random quote
    """
    with open('data/toast_quotes.json', 'r') as file:
        toast_quotes = json.load(file).get('toast_quotes', [])
    
    random_quote, = random.sample(toast_quotes, 1)
    return random_quote