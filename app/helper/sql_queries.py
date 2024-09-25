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
    bar_display = {
        "type": "BAR",
        "title": "Rating Distribution",
        "x_axis": "rating",
        "y_axis": "count",
    }
    line_display = {
        "type": "LINE",
        "title": "Rating Distribution",
        "x_axis": "rating",
        "y_axis": "count",
    }
    # Final response
    bar_graph = {"result": result_json, "display": bar_display, "success": True}
    line_graph = {"result": result_json, "display": line_display, "success": True}
    return bar_graph, line_graph


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
    review_query = """
        SELECT * 
        FROM reviews
        ORDER BY published_at_date DESC
        LIMIT 9
        """
    table_query = """
        SELECT review_id, rating, published_at, review_likes_count
        FROM reviews
        LIMIT 9;
    """
    # Assuming execute_query is a function that executes the SQL query
    reviews_result = execute_query(review_query)
    tables_result = execute_query(table_query)
    # Parse the result if it's a string
    if isinstance(reviews_result.get("result"), str) or isinstance(
        tables_result.get("result"), str
    ):
        try:
            reviews_json = json.loads(reviews_result["result"])
            table_json = json.loads(tables_result["result"])
        except json.JSONDecodeError:
            return {
                "error": "Failed to parse the result into JSON",
                "success": False,
            }
    else:
        reviews_json = reviews_result.get("result")
        table_json = tables_result.ge("result")

    card_display = {
        "type": "CARD",
        "title": "reviews",
        "x_axis": "",
        "y_axis": "",
    }

    table_display = {
        "type": "TABLE",
        "title": "reviews",
        "x_axis": "",
        "y_axis": "",
    }
    card = {"result": reviews_json, "display": card_display, "success": True}
    table = {"result": table_json, "display": table_display, "success": True}
    return card, table


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
    response = {"result": result_json, "display": display, "success": True}

    return response
