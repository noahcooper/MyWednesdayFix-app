/* MyWednesdayFix - app.js | Version: 0.21.0 (09-MAR-2015) */
!function(a){"use strict";var b=function(a){a=a||0;var b=7*a,c=new Date,d=c.getFullYear(),e=c.getMonth(),f=c.getDate(),g=c.getDay(),h=new Date(d,e,3>g?f-g-4:f-g+3),i=new Date(d,e,2>g?f-g+2:f+(9-g));return h.setDate(h.getDate()-b),i.setDate(i.getDate()-b),{startDate:h,endDate:i}},c=function(a){return["January","February","March","April","May","June","July","August","September","October","November","December"][a]},d={};if(d.data={filterWeek:0,currentOffset:0,listIsLoading:!0,isLastListPage:!1,currentIssue:{},currentStore:{}},d.comicVine={apiKey:"e21e187f67061d346687aeb81969a3fd2d1676fa",getIssues:function(c){var e=a.extend({filterWeek:d.data.filterWeek,offset:"0",callback:a.noop},c||{});d.data.listIsLoading=!0;var f=b(e.filterWeek),g=f.startDate,h=f.endDate,i="store_date:"+g.getFullYear()+"-"+(g.getMonth()+1)+"-"+g.getDate()+"|"+h.getFullYear()+"-"+(h.getMonth()+1)+"-"+h.getDate();a.ajax({dataType:"jsonp",url:"http://www.comicvine.com/api/issues/?api_key="+d.comicVine.apiKey+"&field_list=api_detail_url,store_date,description,image,issue_number,volume&filter="+i+"&sort=store_date:asc&limit=24&offset="+e.offset+"&format=jsonp&json_callback=?",success:function(a){d.data.listIsLoading=!1,d.data.currentOffset+=Number(a.number_of_page_results),d.data.currentOffset===Number(a.number_of_total_results)&&(d.data.isLastListPage=!0),e.callback(a)}})},getIssue:function(b){var c=a.extend({callback:a.noop},b||{});a.ajax({dataType:"jsonp",url:"http://www.comicvine.com/api/issue/"+c.issueId+"/?api_key="+d.comicVine.apiKey+"&field_list=store_date,description,image,issue_number,person_credits,volume&format=jsonp&json_callback=?",success:c.callback})}},d.googlePlaces={getComicStores:function(b){var c,d=a.extend({callback:a.noop},b||{}),e=new google.maps.places.PlacesService(document.getElementById("google-places"));c=d.latLng?{location:d.latLng,radius:"40234",query:"comic book stores"}:{query:"comic book stores near "+d.query},e.textSearch(c,d.callback)},getComicStore:function(b){var c=a.extend({callback:a.noop},b||{}),d=new google.maps.places.PlacesService(document.getElementById("google-places"));d.getDetails({reference:c.reference},c.callback)}},d.utils={getQueryParam:function(a){var b,c=window.location.href.split("?")[1];return c&&(c="&"+c.replace(new RegExp("&amp;","g"),"&"),-1!=c.indexOf("&"+a+"=")&&(b=c.split("&"+a+"=")[1].split("&")[0])),b},loadView:function(b){var c=a.extend({isPopState:!1},b||{}),e=c.view,f=c.data;d.data.currentView===e?a("html, body").animate({scrollTop:0},"slow"):(d.data.currentView=e,d.utils.hideHeadlineBack(),d.utils.resetContent(),d.utils.hideLoading(),d.view[e](),window.scrollTo(0,0),window.history&&history.pushState&&!c.isPopState&&history.pushState({view:e,data:f},"",window.location.href.split("?")[0]+"?view="+e+(f?"&"+f:"")),ga("send","pageview",{page:"/"+e+(f?"?"+f:"")}))},showLoading:function(){a("#content-loading").removeClass("hidden")},hideLoading:function(){a("#content-loading").addClass("hidden")},showHeadlineBack:function(){a("#content-headline-back").removeClass("hidden")},hideHeadlineBack:function(){a("#content-headline-back").addClass("hidden")},setHeadline:function(b){a("#content-headline").html(b).removeClass("hidden")},resetContent:function(){a("#content-wrap").html(""),d.data.currentOffset=0,d.data.isLastListPage=!1},formatTime:function(a){var b=a.substring(0,2),c=a.substring(0,2);return 0===b?c="12":0===a.substring(0,1)?c=a.substring(1,2):b>12&&(c-=12),c+":"+a.substring(2)+(b>=12?"pm":"am")}},d.ui={buildPanel:function(b){var c=a.extend({type:"panel-info"},b||{});return'<div class="panel '+c.type+'">'+(c.heading?'<div class="panel-heading"><h3 class="panel-title">'+c.heading+"</h3></div>":"")+(c.body?'<div class="panel-body">'+c.body+"</div>":"")+"</div>"},buildIssuesList:function(b){var c=a.extend({issuesList:[]},b||{});a.each(c.issuesList,function(){var b=this.store_date.split("-"),c=b[0],e=b[1],f=b[2];(0===a("#content-wrap .row").length||3===a("#content-wrap .row:last .feature-col").length)&&a("#content-wrap").append('<div class="row" />');var g,h=this.api_detail_url.split("/issue/")[1].split("/")[0],i=this.volume.name,j=this.issue_number,k=this.description||"",l=0,m="",n=function(a){var b=a.lastIndexOf(". ");return a.lastIndexOf("? ")>b&&(b=a.lastIndexOf("? ")),a.lastIndexOf("! ")>b&&(b=a.lastIndexOf("! ")),a=a.substr(0,b+1)};a("<div>"+k+"</div>").find("p, h4").each(function(){if(!g)if(a(this).is('h4:contains("List of covers and their creators")'))g=!0;else{if(l+=a(this).text().length,l>=475){var b=a(this).text().substr(0,a(this).text().length-(l-475))+" ";b=n(b),a(this).html(b),g=!0}m+=a(this).wrap("<div>").parent().html()}}),a("#content-wrap .row:last").append('<div class="col-sm-4 feature-col">'+d.ui.buildPanel({heading:'<a class="view-issue" href="#" data-issue="'+h+'">'+i+(j?" #"+j:"")+"</a>",body:(this.image.small_url?'<div class="feature-image-wrap"><a class="view-issue" href="#" data-issue="'+h+'"><img alt="" src="'+this.image.small_url+'"></a></div>':"")+"<h3>In Stores "+e+"/"+f+"/"+c+'</h3><div class="issue-desc">'+m+'</div><p><a class="btn btn-primary view-issue" href="#" data-issue="'+h+'">Read more &raquo;</a></p>'})+"</div>")})},buildIssue:function(b){var c=a.extend({issue:{}},b||{}),e=c.issue,f=e.volume.name,g=e.issue_number,h=e.store_date.split("-"),i=h[0],j=h[1],k=h[2];a("#content-wrap").append('<div class="row"><div class="col-xs-12 feature-col">'+d.ui.buildPanel({heading:f+(g?" #"+g:""),body:(e.image.medium_url?'<div class="col-md-6 feature-image-wrap"><img alt="" src="'+e.image.medium_url+'"></div>':"")+'<h3 class="issue-store-date">In Stores '+j+"/"+k+"/"+i+'</h3><div class="issue-desc">'+(e.description||"")+"</div>"})+"</div></div>"),a(".issue-desc figure, .issue-desc img, .issue-desc figcaption").remove(),a(".issue-desc table").addClass("table"),a(".issue-desc table th").each(function(b){a(this).is(':contains("Sidebar Location")')&&(a(this).closest("table").find("td:nth-child("+(b+1)+")").remove(),a(this).remove())}),a.each(e.person_credits,function(b){a("#content-wrap .panel-body").append((b>0?"<br>":"")+'<span class="issue-credits">'+this.name+(this.role?", "+this.role:"")+"</span>")})},buildStoreLookup:function(){a("#content-wrap").append('<div class="panel panel-info"><div class="panel-body"><div class="pull-right" id="powered-by-google"><img alt="Search Powered by Google" src="images/powered-by-google-on-white.png"></div><form id="store-lookup"><div class="form-group"><input type="text" class="form-control" id="lookup-query" placeholder="Enter a ZIP/Postal Code"></div><button type="submit" class="btn btn-default">Search</button></form></div><div class="list-group" id="store-results-list"></div></div>');var b=function(b){"findStore"===d.data.currentView&&(d.utils.hideLoading(),a.each(b,function(){var b=this.name,c=this.types||[];b&&""!==b&&(a.inArray("store",c)>=0||a.inArray("book_store",c)>=0||a.inArray("establishment",c)>=0)&&a("#store-results-list").append('<a class="list-group-item view-store" href="#" data-reference="'+this.reference+'"><h4 class="list-group-item-heading">'+b+'</h4><p class="list-group-item-text">'+this.formatted_address.split(", United States")[0]+"</p></a>")}),0===a("#store-results-list .view-store").length&&a("#store-results-list").append('<div class="list-group-item"><p class="list-group-item-text">No results found.</p></div>'))};if(navigator.geolocation){var c=function(a){d.utils.showLoading(),d.googlePlaces.getComicStores({latLng:new google.maps.LatLng(a.coords.latitude,a.coords.longitude),callback:b})};navigator.geolocation.getCurrentPosition(c)}a("#store-lookup").submit(function(c){c.preventDefault(),a("#store-results-list .list-group-item").remove();var e=a("#lookup-query").val();e.length>0&&(d.utils.showLoading(),d.googlePlaces.getComicStores({query:e,callback:b}))})},buildStore:function(b){var c=a.extend({place:{}},b||{}),e=c.place;if(e){var f,g,h=e.formatted_phone_number,i=e.website,j=e.opening_hours,k=j?!0:!1,l=e.reviews||[],m=0,n=e.rating;if(k&&(f=j.open_now,g=j.periods),!n&&l.length>0&&(a.each(l,function(){this.rating&&(n||(n=0),m++,n+=Number(this.rating))}),n=Math.round(n/m)),a("#content-wrap").append('<div class="row"><div class="col-xs-12 feature-col">'+d.ui.buildPanel({heading:e.name,body:'<p><span class="glyphicon glyphicon-pushpin"></span> '+e.formatted_address.split(", United States")[0]+"</p>"+(h?'<p><span class="glyphicon glyphicon-earphone"></span> '+h+"</p>":"")+(i?'<p><span class="glyphicon glyphicon-globe"></span> <a target="_blank" href="'+i+'">'+i+"</a></p>":"")+(k?(f?'<p class="text-success">This store is open now</p>':'<p class="text-danger">This store is currently closed</p>')+"<p><strong>Hours:</strong></p><p>Monday: "+(g[1]?d.utils.formatTime(g[1].open.time)+" to "+d.utils.formatTime(g[1].close.time):"Closed")+"<br>Tuesday: "+(g[2]?d.utils.formatTime(g[2].open.time)+" to "+d.utils.formatTime(g[2].close.time):"Closed")+"<br>Wednesday: "+(g[3]?d.utils.formatTime(g[3].open.time)+" to "+d.utils.formatTime(g[3].close.time):"Closed")+"<br>Thursday: "+(g[4]?d.utils.formatTime(g[4].open.time)+" to "+d.utils.formatTime(g[4].close.time):"Closed")+"<br>Friday: "+(g[5]?d.utils.formatTime(g[5].open.time)+" to "+d.utils.formatTime(g[5].close.time):"Closed")+"<br>Saturday: "+(g[6]?d.utils.formatTime(g[6].open.time)+" to "+d.utils.formatTime(g[6].close.time):"Closed")+"<br>Sunday: "+(g[0]?d.utils.formatTime(g[0].open.time)+" to "+d.utils.formatTime(g[0].close.time):"Closed")+"</p>":"")+(n?'<div id="store-rating"><p><strong>Rating:</strong></p></div><div id="store-reviews"><p><strong>Reviews:</strong></p></div>':"")})+"</div></div>"),n){var o=function(a){for(var b="",c=0;5>c;c++)b+='<span class="glyphicon glyphicon-star'+(c>=a?"-empty":"")+'"></span>';return b};a("#store-rating").append("<p>"+o(n)+"</p>"),a.each(l,function(){var b=new Date(0);b.setUTCSeconds(this.time),a("#store-reviews").append('<div class="store-review-name"><strong>'+this.author_name+"</strong> "+(b.getMonth()+1)+"/"+b.getDate()+"/"+b.getFullYear()+"</div>"+(this.rating?o(this.rating):"")+'<div class="store-review-text"><p>'+this.text+"</p></div>")})}}else d.utils.loadView({view:"findStore"})}},d.view={thisWeek:function(){d.utils.setHeadline("New This Week"),d.utils.showLoading(),d.data.filterWeek=0,d.comicVine.getIssues({callback:function(a){"thisWeek"===d.data.currentView&&(d.data.isLastListPage&&d.utils.hideLoading(),d.ui.buildIssuesList({issuesList:a.results}))}})},archives:function(){d.utils.setHeadline("Archives");var e="";a.each(new Array(52),function(a){var d=a+1,f=b(d),g=f.startDate;e+='<a class="list-group-item view-archive-week" href="#" data-week="'+d+'"><h4 class="list-group-item-heading">Week of '+c(g.getMonth())+" "+g.getDate()+", "+g.getFullYear()+"</h4></a>"}),a("#content-wrap").append('<div class="panel panel-info"><div class="list-group" id="archives-list">'+e+"</div></div>")},archiveWeek:function(){d.utils.showHeadlineBack(),d.utils.setHeadline("Archives"),d.utils.showLoading(),d.comicVine.getIssues({callback:function(a){"archiveWeek"===d.data.currentView&&(d.data.isLastListPage&&d.utils.hideLoading(),d.ui.buildIssuesList({issuesList:a.results}))}})},viewIssue:function(){var a=d.utils.getQueryParam("filterWeek");d.utils.showHeadlineBack(),a&&d.utils.setHeadline("0"===a?"New This Week":"Archives"),d.utils.showLoading(),d.comicVine.getIssue({issueId:d.data.currentIssue.issueId,callback:function(a){"viewIssue"===d.data.currentView&&(d.utils.hideLoading(),d.ui.buildIssue({issue:a.results}))}})},findStore:function(){d.utils.setHeadline("Find a Comic Book Store"),d.ui.buildStoreLookup()},viewStore:function(){d.utils.showHeadlineBack(),d.utils.setHeadline("Find a Comic Book Store"),d.utils.showLoading(),d.googlePlaces.getComicStore({reference:d.data.currentStore.reference,callback:function(a){"viewStore"===d.data.currentView&&(d.utils.hideLoading(),d.ui.buildStore({place:a}))}})}},-1!==window.location.href.indexOf("http:"));else{d.phonegap={loadExternalUrl:function(a){window.open(a,"_system","location=yes")}};var e=function(){var a=navigator.userAgent;return a?(a=a.toLowerCase(),a.indexOf("ipod")>-1||a.indexOf("iphone")>-1||a.indexOf("ipad")>-1?"ios":void 0):void 0};e()&&a("body").addClass("platform-"+e()),document.addEventListener("deviceready",function(){a("body").on("click",'a[target="_blank"]',function(b){b.preventDefault(),d.phonegap.loadExternalUrl(a(this).attr("href"))})},!1)}var f=d.utils.getQueryParam("view");if(f&&d.view[f]){var g,h,i,j=!0;if("viewIssue"===f)h=d.utils.getQueryParam("filterWeek"),i=d.utils.getQueryParam("issueId"),i?(d.data.currentIssue.issueId=i,g="filterWeek="+h+"&issueId="+i):j=!1;else if("archiveWeek"===f)h=d.utils.getQueryParam("filterWeek"),!h||isNaN(h)||0>h?j=!1:(d.data.filterWeek=Number(h),g="filterWeek="+h);else if("viewStore"===f){var k=d.utils.getQueryParam("reference");k?(d.data.currentStore.reference=k,g="reference="+k):j=!1}d.utils.loadView(j?{view:f,data:g,isPopState:!0}:{view:"thisWeek"})}else d.utils.loadView({view:"thisWeek"});a(window).on("popstate",function(){history.state&&history.state.view&&history.state.view!=d.data.currentView&&d.utils.loadView({view:history.state.view,data:history.state.data,isPopState:!0})}),a(".app-nav").click(function(b){b.preventDefault(),d.utils.loadView({view:a(this).data("view")})}),a("#content-wrap").on("click",".view-issue",function(b){b.preventDefault();var c=a(b.target).closest("a").data("issue");d.data.currentIssue.issueId=c,d.utils.loadView({view:"viewIssue",data:"filterWeek="+d.data.filterWeek+"&issueId="+c})}),a("#content-wrap").on("click",".view-archive-week",function(b){b.preventDefault();var c=a(b.target).closest("a").data("week");d.data.filterWeek=Number(c),d.utils.loadView({view:"archiveWeek",data:"filterWeek="+c})}),a("#content-wrap").on("click",".view-store",function(b){b.preventDefault(),d.data.currentStore.reference=a(b.target).closest(".view-store").data("reference"),d.utils.loadView({view:"viewStore",data:"reference="+a(b.target).closest(".view-store").data("reference")})}),a(window).scroll(function(){if(a(window).scrollTop()+a(window).height()>a(document).height()-400&&("thisWeek"===d.data.currentView||"archiveWeek"===d.data.currentView)&&!d.data.listIsLoading&&!d.data.isLastListPage){d.utils.showLoading();var b=d.data.currentView;d.comicVine.getIssues({offset:d.data.currentOffset,callback:function(a){d.data.currentView===b&&(d.data.isLastListPage&&d.utils.hideLoading(),d.ui.buildIssuesList({issuesList:a.results}))}})}}),a(function(){FastClick.attach(document.body)})}(jQuery);