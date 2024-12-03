import boto3
import json

# Initialize DynamoDB resource and the DynamoDB table
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('CQ-Questions-Table')  # Replace with your table name

# Load the questions data from JSON file
with open('QuestionsData.json') as f:
    questions_data = json.load(f)

# Loop through the questions and put them into DynamoDB
for question in questions_data:
    try:
        # Construct the item to insert
        item = {
            'topic': question['topic'],  # Partition key
            'questionId': question['questionId'],  # Sort key
            'level': question['level'],  # Difficulty level
            'question': question['question'],  # The question text
            'options': question['options'],  # List of options
            'answer': question['answer'],  # Correct answer
        }
        
        # Include the 'hint' attribute only if it's present
        if 'hint' in question:
            item['hint'] = question['hint']
        
        # Insert the item into the DynamoDB table
        response = table.put_item(Item=item)
        print(f"Successfully inserted question: {question['questionId']}")
    except Exception as e:
        print(f"Error inserting question {question['questionId']}: {str(e)}")
