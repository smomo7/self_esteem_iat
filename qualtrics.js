Qualtrics.SurveyEngine.addOnload(function()
{
    /*Place your JavaScript here to run when the page is fully displayed*/
    var qthis = this;
    qthis.hideNextButton();
 
    var task_github = "https://smomo7.github.io/self_esteem_iat/"
 
    var requiredResources = [
        // 修正1：Githubにアップしたフォルダ構造は、"jspsych-6.1.0/~~"ではなく、直にフォルダ名になっているので修正
        // 修正2：必要なプラグインが無いので追加
        task_github + "jspsych.js",
        task_github + "plugins/jspsych-instructions.js",
        task_github + "plugins/jspsych-html-keyboard-response.js",
        task_github + "plugins/jspsych-html-button-response.js", // 新規追加
        task_github + "plugins/jspsych-iat-html_qualtrics.js",
        task_github + "plugins/jspsych-survey-text.js",
        task_github + "plugins/jspsych-survey-multi-choice.js",
        task_github + "plugins/jspsych-fullscreen_jp.js",
        task_github + "main.js"
    ];
 
    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
            }
        });
    }
 
    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }
 
    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');
     
    function initExp() {
        jsPsych.init({
            timeline: timeline,
            display_element: 'display_stage',
            on_finish: function (data) {
       
                  var datajs = jsPsych.data.get().ignore('self_name01').ignore('self_name02').ignore('self_name03').ignore('other_name01').ignore('other_name02').ignore('other_name03').json();
                 
                Qualtrics.SurveyEngine.setEmbeddedData("datajs", datajs);
         
                jQuery('display_stage').remove();
                jQuery('display_stage_background').remove();
         
                qthis.clickNextButton();
            }
        });
      };
});
 
Qualtrics.SurveyEngine.addOnReady(function()
{
    /*Place your JavaScript here to run when the page is fully displayed*/
 
});
 
Qualtrics.SurveyEngine.addOnUnload(function()
{
    /*Place your JavaScript here to run when the page is unloaded*/
 
});