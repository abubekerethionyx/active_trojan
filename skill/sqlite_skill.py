import sqlite3

def sqlLite_query (query:str):
    try:
        conn = sqlite3.connect('./database.db')
        cursor = conn.cursor()


        # Execute the query
        cursor.execute(query)

        # Fetch and print results
        results = cursor.fetchall()
        conn.close()
        
        return results
        # Close the connection
      
    except sqlite3.Error as e:
        print(f"Error: {e}")
        return None

