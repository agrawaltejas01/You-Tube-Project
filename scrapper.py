
url = 'https://www.youtube.com/watch?v=msHxxzSUYV0'

#Extract video_id from URL
import urllib.parse as urlparse
url_data = urlparse.urlparse(url)
query = urlparse.parse_qs(url_data.query)
video_id = video = query["v"][0]

#Get Transcript
from youtube_transcript_api import YouTubeTranscriptApi
try:
	transcript = YouTubeTranscriptApi.get_transcript(video_id)
except :
	print("Error")
#Returns time in second

user_input = "player"
time_points = []


#Case sensitive and Whole word
case_sensitive = 1
whole_word = 1

if case_sensitive == 0:		# If NOT case sensitive, make everything in lower case
	user_input = user_input.lower()

for entry in transcript:
	if case_sensitive == 0:	
		txt = entry['text'].lower()
	else:
		txt = entry['text']
	#If NOT whole word do not split	

	if whole_word == 0:
		if user_input in txt:
			time_points.append(int(entry['start']))
	else :
		if user_input in txt.split():
			time_points.append(int(entry['start']))
	
#URL takes only integer hence convert to int

#to go directly at a point in youtube 
# url = original_url + "&t=__s"
#Takes only sec in integer
#Build URLS
result = []

for i in time_points:
	if i == 0:
		result.append(url)
	else:
		result.append(url + '&t=' + str(i) + 's')		

# print(len(result))
import webbrowser
for i in result:
	webbrowser.open(i)