// ==UserScript==
// @name        SanskritDocumentsOrgTransliterator
// @namespace   http://hop5.in
// @author      Naresh Kumar < vnareshkumar / gmail >
// @description Sanskrit Documents Transliterator
// @include     https://sanskritdocuments.org/*
// @include     http://www.sanskritdocuments.org/*
// @version     aug 2017
// @grant       none
// @require     https://code.jquery.com/jquery-2.1.1.min.js
// @require     http://hop5.in/LearnKannada/js/vendor/sanscript.js
// ==/UserScript==
(function () {
  try {
    // getParameterByName taken from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript 
    function getParameterByName(name) {
      name = name.replace(/[\[]/, '\\[') .replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
      results = regex.exec(location.search);
      return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    var langMap = {
      'bn': 'bengali',
      'gr': 'grantha',
      'gt': 'grantamil',
      'gu': 'gujarati',
      'hi': 'devanagari',
      'iast': 'iast',
      'kn': 'kannada',
      'ml': 'malayalam',
      'or': 'oriya',
      'pa': 'gurmukhi',
      'sa': 'devanagari',
      'ta': 'tamil',
      'te': 'telugu',
      'en-IN': 'itrans',
      'ru': 'cyrillic',
//      'roman': 'iast',
//      'sa-Latn': 'iast',
    };
    var displayLanguages = {
      'Devanagari': 'sa',
      'Roman': 'iast',
      'Bengali': 'bn',
      'Gujarati': 'gu',
      'Gurumukhi': 'pa',
      'Kannada': 'kn',      
      'Malayalam': 'ml',
      'Oriya': 'or',     
      'Telugu': 'te',  
      'Tamil': 'ta',
      'GranTamil': 'gt',
      'Grantha': 'gr',
      'Cyrillic': 'ru',
    };     
   if ($('#content') .length > 0) {
      var uiLang = getParameterByName('lang');
      var $el = $('#content');
      var $cl = $el.clone() .appendTo('body') .hide() .attr('id', 'original-source');
      var $div = $('<div id="brand" itemscope itemtype="http://schema.org/Organization"><img src="https://sanskritdocuments.org/css/images/SanskritDocuments1.jpg" style="max-width:1232px;width:100%; height:auto; margin: auto;"></div>');
      var $ul = $('<ul id="top-nav-list"></ul>');
      var mark = '<a href="https://sanskritdocuments.org/"><img src="https://sanskritdocuments.org/favicon.ico" width="16px" height="16px" title="Sanskrit Documents Collection" alt="Sanskrit Documents Collection"></a>';
      var url = window.location.href.replace(/\?.*$/, '');
      var base = url.replace(/.html/,'');
      mark+= ' <li><a href="' + base + '.itx"' + 'title="ITRANS source file" target="_itx">| ITX</a></li>';
      mark+= ' <li><a href="' + base + '.pdf"' + 'title="pdf in devanagari script" target="_pdf">PDF</a></li>';  
      for (var la in displayLanguages) {
          var blank = '';
          mark += '<li><a data-lang="' + displayLanguages[la] + '" href="' + url + '?lang=' + (displayLanguages[la]) + '">' + la + '</a></li>';
      }  
       mark+= '<li><a href="https://sanskritdocuments.org/noteonotherfonts.php" title="Use aksharamukha by Vinodh Rajan to convert to other languages/scripts">Others</a></li><li><a title="Enter URL on next page to save webpage as PDF" href="http://www.htm2pdf.co.uk/" target="_blank">htm2pdf</a></li>';
       $ul.html(mark);
       $ul.on('click', 'a', function (e) {
           if ($(this).attr('data-lang') && $(this).attr('data-lang').length > 0) {
              e.preventDefault();
              var toLang = $(this) .data('lang');
              var toShortLang = toLang;
              var fintext = Sanscript.t($('#original-source').text(), 'devanagari', langMap[toLang]);
              $el.text(fintext).attr('lang', toShortLang);
              var itxtitle = $('#stotrapdf').text();
              var so = { title : toLang + ' ' + itxtitle };
              var url = window.location.href.replace(/\?.*$/, '');
              history.pushState(so, so.title, url + '?lang=' + toShortLang);
          }
      })
      $ul.appendTo($div);
      $div.prependTo('body');
      var fintext = Sanscript.t($cl.text(), 'devanagari', langMap[uiLang]);
      $el.text(fintext).attr('lang', uiLang);
    } 
   else 
    {
      console.log('ERROR: Unable to detect the document Mode. Please make sure your page-html structure is not changed. !!');
    }
  } 
  catch (e) {
    console.log('FATAL ERROR : %s', e);
  }
}) ();