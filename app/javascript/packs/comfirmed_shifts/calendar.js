import { Calendar, whenTransitionDone } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'
import googleCalendarApi from '@fullcalendar/google-calendar'

document.addEventListener('turbolinks:load', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new Calendar(calendarEl, {
        plugins: [ dayGridPlugin, interactionPlugin, googleCalendarApi ],
        events: '/comfirmed_shifts.json',
        googleCalendarApiKey: 'AIzaSyBJgxvPtAdElMF6qlcqWqIwFludRmesnOI',
        eventSources : [
            {
              googleCalendarId: 'japanese__ja@holiday.calendar.google.com',
              display: 'background',
              color:"#ffd0d0"
            }
        ],
        locale: 'ja',
        timeZone: 'Asia/Tokyo',
        firstDay: 1,
        scrollTime: '07:00:00',
        buttonText: {
            today: '今月'
        }, 
        headerToolbar: {
            left: '',
            center: 'title',
            right: 'today prev,next' 
        },
        height: "auto",
        dayCellContent: function(e) {
            e.dayNumberText = e.dayNumberText.replace('日', '');
        },
        eventClassNames: function(arg){
            return [ 'horizon' ]
        }
    });

    calendar.render();

    $(".error").click(function(){
        calendar.refetchEvents();
    });
});
