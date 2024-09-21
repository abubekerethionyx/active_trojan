import mysql.connector


def execute_query(query, params=None):
    """
    Executes a MySQL query and fetches results.
    
    :param query: The SQL query to execute.
    :param params: Optional parameters to pass with the query (for prepared statements).
    :return: The results of the query.
    """
    try:
        # Establish the MySQL connection
        connection = mysql.connector.connect(
            host='127.0.0.1',     # e.g., 'localhost'
            database='agents',   # e.g., 'employees_db'
            user='root',     # e.g., 'root'
            password='root'
        )

        if connection.is_connected():
            print("Connected to MySQL database")

            # Create a cursor object
            cursor = connection.cursor()

            # Execute the query
            cursor.execute(query, params)

            # Fetch all the rows
            result = cursor.fetchall()

            # Close the cursor and connection
            cursor.close()
            connection.close()

            return result

    except Exception as err:
        print(f"Error: {err}")
        return None

# result = execute_query("SELECT * FROM users;")
# print(result)