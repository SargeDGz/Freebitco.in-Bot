// ==UserScript==
// @name         Freebitco.in Bot
// @github       https://github.com/SargeDGz/Freebitco.in-Bot/
// @version      1.0
// @description  feel free to donate: 17Gyqxoexraa9qfVKYZW7buftuVYtaEp49
// @author       Sarge
// @match        https://freebitco.in/*
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
'use strict';
$("body").append (
    '<img id="myNewImage" src="https://media0.giphy.com/media/4KFvuA2LmYYVv46CNN/giphy.gif">'
);
$("#myNewImage").css ( {
    position:   "fixed",
    width:      "256px",
    height:     "256px",
  bottom:      "0",
    right:       "0"
} );
var body = $('body');

var points = {};

if ($('#free_play_form_button').is(':visible'))
    setTimeout(function(){ $('#free_play_form_button').click();},Math.floor(Math.random() * 1000 + 20000)); //20000 could be changet to 2000, but on RPi or other small devices it could make problems.
if ($('.close-reveal-modal').is(':visible'))
    setTimeout(function(){ $('.close-reveal-modal').click(); },8000); //8000 could be changet to 2000, but on RPi or other small devices it could make problems.

var reward = {};
reward.select = function() {
    reward.points = parseInt($('.user_reward_points').text().replace(',',""));
    reward.bonustime = {};
    if ($("#bonus_container_free_points").length != 0) {
        reward.bonustime.text = $('#bonus_span_free_points').text();
        reward.bonustime.hour = parseInt(reward.bonustime.text.split(":")[0]);
        reward.bonustime.min = parseInt(reward.bonustime.text.split(":")[1]);
        reward.bonustime.sec = parseInt(reward.bonustime.text.split(":")[2]);
        reward.bonustime.current = reward.bonustime.hour * 3600 + reward.bonustime.min * 60 + reward.bonustime.sec;
    } else
        reward.bonustime.current = 0;


    console.log(reward.bonustime.current);
    if (reward.bonustime.current !== 0) {
        console.log(reward.bonustime.current);
    } else {
        if (reward.points < 12) {
            console.log("waiting for points");
        }
        else if (reward.points < 120) {
                console.log("waiting for points 60");
                RedeemRPProduct('free_points_1');
            }
        else if (reward.points > 119) {
                console.log("waiting for points 120");
                RedeemRPProduct('free_points_10');
            }

        if ($('#bonus_span_fp_bonus').length === 0)
            if (reward.points > 320)
                RedeemRPProduct('fp_bonus_50');
            // else if (reward.points >= 2800) {
            //     RedeemRPProduct('fp_bonus_500');
            // }
            // else if (reward.points >= 1520) {
            //     RedeemRPProduct('fp_bonus_100');
            // }
    }
};
body.prepend(
    $('<div/>').attr('style',"position:fixed;bottom:0px;left:0;z-index:999;width:350px;background-color:black;color: white; text-align: left;")
        .append(
            $('<div/>').attr('id','autofaucet')
                .append($('<p/>').attr('style','text-decoration:underline;').text("freebitco.in Auto Faucet by Sarge"))
                .append($('<p/>').text("If you like it, consider a Donation to "))
                .append($('<p/>').text("17Gyqxoexraa9qfVKYZW7buftuVYtaEp49"))
                .append($('<p/>').text("(click to copy address)"))
                .append($('<p/>')
                    .append($('<p/>').text("Current Features:"))
                    .append($('<p/>').text("Auto Roll"))
                    .append($('<p/>').text("Auto Select Rewards"))
                    .append($('<p/>').text("(according to Highest rewards/BTC Bonus)"))
                )

        ).click(function(){
        var $temp = $('<input>').val("17Gyqxoexraa9qfVKYZW7buftuVYtaEp49");
        body.append($temp);
        $temp.select();
        document.execCommand("copy");
        $temp.remove();
    })
).prepend($('<style/>')
    .text("#autofaucet p { margin: 0; margin-left: 2px;  text-align: left; }")
);
setTimeout(reward.select,1000);
setInterval(reward.select,60000);
})();
