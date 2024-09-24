import json
from skill.mysql_skill import execute_query


def get_rating():
    query = """
        SELECT rating, COUNT(*) as count
        FROM reviews
        GROUP BY rating
        ORDER BY rating ASC
        """
    result = execute_query(query)
    # Parse the result if it's a string
    if isinstance(result.get("result"), str):
        try:
            result_json = json.loads(result["result"])
        except json.JSONDecodeError:
            return {
                "error": "Failed to parse the result into JSON",
                "success": False,
            }
    else:
        result_json = result.get("result")
    # Define display details for the response
    display = {
        "type": "BAR",
        "title": "Rating Distribution",
        "x_axis": "rating",
        "y_axis": "count",
    }

    # Final response
    response = {"result": result_json, "display": display, "success": True}
    return response


def get_likes():
    query = """
        SELECT review_likes_count as likes, COUNT(*) as count
        FROM reviews
        GROUP BY review_likes_count
        ORDER BY review_likes_count ASC
        """

    # Assuming execute_query is a function that executes the query
    result = execute_query(query)

    # Parse the result if it's a string
    if isinstance(result.get("result"), str):
        try:
            result_json = json.loads(result["result"])
        except json.JSONDecodeError:
            return {
                "error": "Failed to parse the result into JSON",
                "success": False,
            }
    else:
        result_json = result.get("result")

    # Define display details for the response
    display = {
        "type": "PIE",
        "title": "Likes Distribution",
        "x_axis": "likes",
        "y_axis": "count",
    }

    # Final response
    response = {"result": result_json, "display": display, "success": True}

    return response


def get_review():
    query = """
        SELECT * 
        FROM reviews
        ORDER BY published_at_date DESC
        LIMIT 9
        """

    # Assuming execute_query is a function that executes the SQL query
    result = execute_query(query)

    # Parse the result if it's a string
    if isinstance(result.get("result"), str):
        try:
            result_json = json.loads(result["result"])
        except json.JSONDecodeError:
            return {
                "error": "Failed to parse the result into JSON",
                "success": False,
            }
    else:
        result_json = result.get("result")

    display = {
        "type": "CARD",
        "title": "reviews",
        "x_axis": "",
        "y_axis": "",
    }
    response = {"result": result_json, "display": display, "success": True}

    return response


import json


import json

import json

def get_review_count_daily():
    query = """
    SELECT published_at_date,COUNT(*) AS review_count
    FROM reviews
    GROUP BY published_at_date
    ORDER BY published_at_date;
     """

    # Assuming execute_query is a function that executes the SQL query
    result = execute_query(query)

    # Parse the result if it's a string
    if isinstance(result.get("result"), str):
        try:
            result_json = json.loads(result["result"])
        except json.JSONDecodeError:
            return {
                "error": "Failed to parse the result into JSON",
                "success": False,
            }
    else:
        result_json = result.get("result")

    # Define display details for the response
    display = {
        "type": "CARD",
        "title": "Reviews Per Day",
        "x_axis": "Review Date",
        "y_axis": "Number of Reviewers",
    }
    
    # Final response
    response = {
        "result": result_json, 
        "display": display, 
        "success": True
    }

    return response
