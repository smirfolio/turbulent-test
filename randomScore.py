import requests
import random
import time

url = "http://localhost:5000/update-score"

while True:
    id = random.randint(1, 20)
    score = random.randint(2453, 10000)
    query = """
    mutation {{
        createPlayerScore(input: {{id: {}, score: {}}}) {{
            id
        }}
    }}
    """.format(id, score)

    response = requests.post(url, json={'query': query})
    print(f"Sent query: {query}. Response: {response.json()}")

    time.sleep(0.09)
