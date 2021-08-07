import { Calendar, whenTransitionDone } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import weekGridPlugin from '@fullcalendar/timegrid'
//import dayGridPlugin from '@fullcalendar/daygrid'
import googleCalendarApi from '@fullcalendar/google-calendar'

import '@fullcalendar/common/main.css'
import '@fullcalendar/timegrid/main.css'

document.addEventListener('turbolinks:load', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new Calendar(calendarEl, {
        plugins: [ weekGridPlugin, interactionPlugin, googleCalendarApi ],
        events: '/perfect_shifts.json',
        googleCalendarApiKey: 'AIzaSyBJgxvPtAdElMF6qlcqWqIwFludRmesnOI',
        eventSources : [
            {
              googleCalendarId: 'japanese__ja@holiday.calendar.google.com',
              display: 'background',
              color:"#FF8C00"
            }
        ],
        locale: 'ja',
        timeZone: 'Asia/Tokyo',
        slotMinTime: '07:00:00',
        slotMaxTime: '31:00;00',
        slotDuration: "01:00:00" ,
        firstDay: 1,
        headerToolbar: {
            start: '',
            center: 'title',
            end: 'today prev,next' 
        },
        buttonText: {
            today: '今日'
        }, 
        allDayText: '営業 催事',
        height: "auto",


        dateClick: function(info){
            const year  = info.date.getFullYear();
            const month = (info.date.getMonth() + 1);
            const day   = info.date.getDate();

            if(info.allDay){
                $.ajax({
                    type: 'GET',
                    url:  '/perfect_shifts/new_plan',
                }).done(function (res) {
                    //イベント登録用のhtmlを作成
                    $('.modal-body').html(res);
                    
                    $('#individual_shift_start_1i').val(year);
                    $('#individual_shift_start_2i').val(month);
                    $('#individual_shift_start_3i').val(day);
                
                    $('#modal').fadeIn();
                    // 成功処理
                }).fail(function (result) {
                    // 失敗処理
                    alert("failed");
                });
            }
        },        


        eventClick: function(info){
            var id = info.event.id
            if(info.el.style.backgroundColor == "yellow"){
                $.ajax({
                    type: "GET",
                    url:  "/perfect_shifts/fill",
                    data: { shift_id : id },
                    datatype: "html",
                }).done(function(res){
                
                    $('.modal-body').html(res)
                    $('#modal').fadeIn();
                }).fail(function (result) {
                    // 失敗処理
                    alert("failed");
                });
            }else if(info.el.style.backgroundColor == "white"){
                $.ajax({
                    type: "GET",
                    url:  "/perfect_shifts/change",
                    data: { shift_id : id },
                    datatype: "html",
                }).done(function(res){
                
                    $('.modal-body').html(res)
                    $('#modal').fadeIn();
                }).fail(function (result) {
                    // 失敗処理
                    alert("failed");
                });
            }
            // else if(info.el.style.backgroundColor == "rgb(135, 206, 250)"){
            //     $.ajax({
            //         type: "GET",
            //         url:  "/perfect_shifts/change_shift",
            //         data: { shift_id : id },
            //         datatype: "html",
            //     }).done(function(res){
                
            //         $('.modal-body').html(res)
            //         $('#modal').fadeIn();
            //     }).fail(function (result) {
            //         // 失敗処理
            //         alert("failed");
            //     });
            // }
            
        },

        eventClassNames: function(arg){
            if(arg.event.allDay){
                return [ 'horizon' ]
            }else{
                return [ 'vertical' ]
            }
        }
    });

    calendar.render();

    $(".error").click(function(){
        calendar.refetchEvents();
    });
});

$(function(){
    $('button.plan').click(function(){
        $.ajax({
            type: 'GET',
            url:  '/perfect_shifts/new_plan',
        }).done(function (res) {
            //イベント登録用のhtmlを作成
            $('.modal-body').html(res);
        
            $('#modal').fadeIn();
            // 成功処理
        }).fail(function (result) {
            // 失敗処理
            alert("failed");
        });
    });

    $('button.shift').click(function(){
        $.ajax({
            type: 'GET',
            url:  '/perfect_shifts/new_shift',
        }).done(function (res) {
            //イベント登録用のhtmlを作成
            $('.modal-body').html(res);
        
            $('#modal').fadeIn();
            // 成功処理
        }).fail(function (result) {
            // 失敗処理
            alert("failed");
        });
    });

    $("button.shift_period").click(function(){
        $.ajax({
            type: "GET",
            url:  'masters/shift_onoff_form',
        }).done(function(res){
           //イベント登録用のhtmlを作成
            $('.modal-body').html(res);
        
            $('#modal').fadeIn();
            // 成功処理
        }).fail(function (result) {
            // 失敗処理
            alert("failed");
        });
    })
});