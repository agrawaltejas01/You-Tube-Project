from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from django.template import loader
import datetime

def index(request):
    # return HttpResponse("<h1>Hello World</h1>")
    a = 1
    template = loader.get_template('word_finder/index.html')
    context = {
        'a' : a,
    }
    return HttpResponse(template.render(context, request))

def result(request):  

    url = request.POST['URL']

    #Extract video_id from URL
    import urllib.parse as urlparse
    url_data = urlparse.urlparse(url)
    query = urlparse.parse_qs(url_data.query)
    video_id = video = query["v"][0]

    #Get Transcript
    #Returns time in second
    from youtube_transcript_api import YouTubeTranscriptApi
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
    except :
        print("Error")
        template = loader.get_template('word_finder/no_transcript.html')
        dummy = 1
        context = { 'dummy' : dummy,}
        return HttpResponse(template.render(context, request))

    
    user_input = request.POST['WORD']
    time_points = []

    #Case sensitive and Whole word
    if 'case_sensitive' in request.POST.keys():
        case_sensitive = 1
    else:
        case_sensitive = 0
    
    if 'whole_word' in request.POST.keys():
        whole_word = 1
    else:
        whole_word = 0

    
    
    # If NOT case sensitive, make everything in lower case
    if case_sensitive == 0:		
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
    
    if len(result) == 0:
        template = loader.get_template('word_finder/no_word.html')
        dummy = 1
        context = { 'dummy' : dummy,}
        return HttpResponse(template.render(context, request))
    
    # Create a minute array to print in url
    minutes_array = []

    for i in time_points:
        minutes_array.append(str(datetime.timedelta(seconds = i)))

    template = loader.get_template('word_finder/found.html')
    context = {        
        'zipped' : zip(result, minutes_array),
    }
    return HttpResponse(template.render(context, request))
