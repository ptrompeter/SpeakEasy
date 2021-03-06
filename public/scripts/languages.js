$(window).load(function(){
  console.log("firing languages");

  var languages = {};
  languages.all = {
        afrikaans: "af",
        albanian: "sq",
        arabic: "ar",
        armenian: "hy",
        azerbaijani: "az",
        Basque: "eu",
        belarusian: "be",
        bengali: "bn",
        bosnian: "bs",
        bulgarian: "bg",
        catalan: "ca",
        cebuano: "ceb",
        chichewa: "ny",
        "chinese simplified": "zh-CN",
        "chinese traditional": "zh-TW",
        croatian: "hr",
        czech: "cs",
        danish: "da",
        dutch: "nl",
        english: "en",
        esperanto: "eo",
        estonian: "et",
        filipino: "tl",
        finnish: "fi",
        french: "fr",
        galician: "gl",
        georgian: "ka",
        estonian: "et",
        german: "de",
        greek: "el",
        gujarati: "gu",
        "haitian creole": "ht",
        hausa: "ha",
        hebrew: "iw",
        hindi: "hi",
        hmong: "hmn",
        icelandic: "is",
        igbo: "ig",
        indonesian: "id",
        irish: "ga",
        italian: "it",
        japanese: "ja",
        javanese: "jw",
        kannada: "kn",
        kazakh: "kk",
        khmer: "km",
        korean: "ko",
        lao: "lo",
        latin: "la",
        latvian: "lv",
        lithuanian: "lt",
        macedonian: "mk",
        malagasy: "mg",
        malay: "ms",
        malayalam: "ml",
        maltese: "mt",
        maori: "mi",
        marathi: "mr",
        mongolian: "mn",
        "myanmar (burmese)": "my",
        nepali: "ne",
        norwegian: "no",
        persian: "fa",
        polish: "pl",
        portuguese: "pt",
        punjabi: "ma",
        romanian: "ro",
        russian: "ru",
        serbian: "sr",
        sesotho: "st",
        sinhala: "si",
        slovak: "sk",
        slovenian: "sl",
        somali: "so",
        spanish: "es",
        sudanese: "su",
        swahili: "sw",
        swedish: "sv",
        tajik: "tg",
        tamil: "ta",
        telugu: "te",
        thai: "th",
        turkish: "tr",
        ukrainian: "uk",
        urdu: "ur",
        uzbek: "uz",
        vietnamese: "vi",
        welsh: "cy",
        yiddish: "yi",
        yoruba: "yo",
        zulu: "zu"
  };



  //this method takes a jquery selected element as an argument
  languages.load = function(){
    var langArr = Object.keys(this.all)
    langArr.forEach(function(element, index, array){
      var option = '<option value=\'' + languages.all[element] + '\'>' + element + '</option>'
      var $el = $('#language');
      $el.append(option);
    });
  };

  languages.load();
})
