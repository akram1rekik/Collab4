/*! adapterjs - v0.10.5 - 2015-02-11 */
var AdapterJS=AdapterJS||{};if(AdapterJS.options={},AdapterJS.VERSION="0.10.5",AdapterJS.onwebrtcready=AdapterJS.onwebrtcready||function(){},AdapterJS.WebRTCPlugin=AdapterJS.WebRTCPlugin||{},AdapterJS.WebRTCPlugin.pluginInfo={prefix:"Tem",plugName:"TemWebRTCPlugin",pluginId:"plugin0",type:"application/x-temwebrtcplugin",onload:"__TemWebRTCReady0",portalLink:"http://temasys.atlassian.net/wiki/display/TWPP/WebRTC+Plugins",downloadLink:null,companyName:"Temasys"},navigator.platform.match(/^Mac/i)?AdapterJS.WebRTCPlugin.pluginInfo.downloadLink="http://bit.ly/1n77hco":navigator.platform.match(/^Win/i)&&(AdapterJS.WebRTCPlugin.pluginInfo.downloadLink="http://bit.ly/1kkS4FN"),AdapterJS.WebRTCPlugin.pageId=Math.random().toString(36).slice(2),AdapterJS.WebRTCPlugin.plugin=null,AdapterJS.WebRTCPlugin.setLogLevel=null,AdapterJS.WebRTCPlugin.defineWebRTCInterface=null,AdapterJS.WebRTCPlugin.isPluginInstalled=null,AdapterJS.WebRTCPlugin.pluginInjectionInterval=null,AdapterJS.WebRTCPlugin.injectPlugin=null,AdapterJS.WebRTCPlugin.PLUGIN_STATES={NONE:0,INITIALIZING:1,INJECTING:2,INJECTED:3,READY:4},AdapterJS.WebRTCPlugin.pluginState=AdapterJS.WebRTCPlugin.PLUGIN_STATES.NONE,AdapterJS.onwebrtcreadyDone=!1,AdapterJS.WebRTCPlugin.PLUGIN_LOG_LEVELS={NONE:"NONE",ERROR:"ERROR",WARNING:"WARNING",INFO:"INFO",VERBOSE:"VERBOSE",SENSITIVE:"SENSITIVE"},AdapterJS.WebRTCPlugin.WaitForPluginReady=null,AdapterJS.WebRTCPlugin.callWhenPluginReady=null,AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb=null,__TemWebRTCReady0=function(){"complete"===document.readyState?(AdapterJS.WebRTCPlugin.pluginState=AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY,AdapterJS.maybeThroughWebRTCReady()):AdapterJS.WebRTCPlugin.documentReadyInterval=setInterval(function(){"complete"===document.readyState&&(clearInterval(AdapterJS.WebRTCPlugin.documentReadyInterval),AdapterJS.WebRTCPlugin.pluginState=AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY,AdapterJS.maybeThroughWebRTCReady())},100)},AdapterJS.maybeThroughWebRTCReady=function(){AdapterJS.onwebrtcreadyDone||(AdapterJS.onwebrtcreadyDone=!0,"function"==typeof AdapterJS.onwebrtcready&&AdapterJS.onwebrtcready(null!==AdapterJS.WebRTCPlugin.plugin))},AdapterJS._iceConnectionStates={starting:"starting",checking:"checking",connected:"connected",completed:"connected",done:"completed",disconnected:"disconnected",failed:"failed",closed:"closed"},AdapterJS._iceConnectionFiredStates=[],AdapterJS.isDefined=null,AdapterJS.parseWebrtcDetectedBrowser=function(){var hasMatch,checkMatch=navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];if(/trident/i.test(checkMatch[1])?(hasMatch=/\brv[ :]+(\d+)/g.exec(navigator.userAgent)||[],webrtcDetectedBrowser="IE",webrtcDetectedVersion=parseInt(hasMatch[1]||"0",10)):"Chrome"===checkMatch[1]&&(hasMatch=navigator.userAgent.match(/\bOPR\/(\d+)/),null!==hasMatch&&(webrtcDetectedBrowser="opera",webrtcDetectedVersion=parseInt(hasMatch[1],10))),navigator.userAgent.indexOf("Safari")&&("undefined"!=typeof InstallTrigger?webrtcDetectedBrowser="firefox":document.documentMode?webrtcDetectedBrowser="IE":Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0?webrtcDetectedBrowser="safari":window.opera||navigator.userAgent.indexOf(" OPR/")>=0?webrtcDetectedBrowser="opera":window.chrome&&(webrtcDetectedBrowser="chrome")),webrtcDetectedBrowser||(webrtcDetectedVersion=checkMatch[1]),!webrtcDetectedVersion)try{checkMatch=checkMatch[2]?[checkMatch[1],checkMatch[2]]:[navigator.appName,navigator.appVersion,"-?"],null!==(hasMatch=navigator.userAgent.match(/version\/(\d+)/i))&&checkMatch.splice(1,1,hasMatch[1]),webrtcDetectedVersion=parseInt(checkMatch[1],10)}catch(error){}},AdapterJS.maybeFixConfiguration=function(pcConfig){if(null!==pcConfig)for(var i=0;i<pcConfig.iceServers.length;i++)pcConfig.iceServers[i].hasOwnProperty("urls")&&(pcConfig.iceServers[i].url=pcConfig.iceServers[i].urls,delete pcConfig.iceServers[i].urls)},AdapterJS.addEvent=function(elem,evnt,func){elem.addEventListener?elem.addEventListener(evnt,func,!1):elem.attachEvent?elem.attachEvent("on"+evnt,func):elem[evnt]=func},webrtcDetectedType=null,webrtcDetectedDCSupport=null,checkMediaDataChannelSettings=function(peerBrowserAgent,peerBrowserVersion,callback,constraints){if("function"==typeof callback){var beOfferer=!0,isLocalFirefox="firefox"===webrtcDetectedBrowser,isLocalFirefoxInterop="moz"===webrtcDetectedType&&webrtcDetectedVersion>30,isPeerFirefox="firefox"===peerBrowserAgent;if(isLocalFirefox&&isPeerFirefox||isLocalFirefoxInterop)try{delete constraints.mandatory.MozDontOfferDataChannel}catch(error){}else isLocalFirefox&&!isPeerFirefox&&(constraints.mandatory.MozDontOfferDataChannel=!0);if(!isLocalFirefox)for(var prop in constraints.mandatory)constraints.mandatory.hasOwnProperty(prop)&&-1!==prop.indexOf("Moz")&&delete constraints.mandatory[prop];!isLocalFirefox||isPeerFirefox||isLocalFirefoxInterop||(beOfferer=!1),callback(beOfferer,constraints)}},checkIceConnectionState=function(peerId,iceConnectionState,callback){"function"==typeof callback&&(peerId=peerId?peerId:"peer",AdapterJS._iceConnectionFiredStates[peerId]&&iceConnectionState!==AdapterJS._iceConnectionStates.disconnected&&iceConnectionState!==AdapterJS._iceConnectionStates.failed&&iceConnectionState!==AdapterJS._iceConnectionStates.closed||(AdapterJS._iceConnectionFiredStates[peerId]=[]),iceConnectionState=AdapterJS._iceConnectionStates[iceConnectionState],AdapterJS._iceConnectionFiredStates[peerId].indexOf(iceConnectionState)<0&&(AdapterJS._iceConnectionFiredStates[peerId].push(iceConnectionState),iceConnectionState===AdapterJS._iceConnectionStates.connected&&setTimeout(function(){AdapterJS._iceConnectionFiredStates[peerId].push(AdapterJS._iceConnectionStates.done),callback(AdapterJS._iceConnectionStates.done)},1e3),callback(iceConnectionState)))},createIceServer=null,createIceServers=null,RTCPeerConnection=null,RTCSessionDescription="function"==typeof RTCSessionDescription?RTCSessionDescription:null,RTCIceCandidate="function"==typeof RTCIceCandidate?RTCIceCandidate:null,getUserMedia=null,attachMediaStream=null,reattachMediaStream=null,webrtcDetectedBrowser=null,webrtcDetectedVersion=null,navigator.mozGetUserMedia)webrtcDetectedBrowser="firefox",webrtcDetectedVersion=parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1],10),webrtcDetectedType="moz",webrtcDetectedDCSupport="SCTP",RTCPeerConnection=function(pcConfig,pcConstraints){return AdapterJS.maybeFixConfiguration(pcConfig),new mozRTCPeerConnection(pcConfig,pcConstraints)},RTCSessionDescription=mozRTCSessionDescription,window.RTCSessionDescription=RTCSessionDescription,RTCIceCandidate=mozRTCIceCandidate,window.RTCIceCandidate=RTCIceCandidate,getUserMedia=navigator.mozGetUserMedia.bind(navigator),navigator.getUserMedia=getUserMedia,MediaStreamTrack.getSources=function(successCb){setTimeout(function(){var infos=[{kind:"audio",id:"default",label:"",facing:""},{kind:"video",id:"default",label:"",facing:""}];successCb(infos)},0)},createIceServer=function(url,username,password){var iceServer=null,url_parts=url.split(":");if(0===url_parts[0].indexOf("stun"))iceServer={url:url};else if(0===url_parts[0].indexOf("turn"))if(webrtcDetectedVersion<27){var turn_url_parts=url.split("?");(1===turn_url_parts.length||0===turn_url_parts[1].indexOf("transport=udp"))&&(iceServer={url:turn_url_parts[0],credential:password,username:username})}else iceServer={url:url,credential:password,username:username};return iceServer},createIceServers=function(urls,username,password){var iceServers=[];for(i=0;i<urls.length;i++){var iceServer=createIceServer(urls[i],username,password);null!==iceServer&&iceServers.push(iceServer)}return iceServers},attachMediaStream=function(element,stream){return element.mozSrcObject=stream,element.play(),element},reattachMediaStream=function(to,from){return to.mozSrcObject=from.mozSrcObject,to.play(),to},MediaStreamTrack.getSources=MediaStreamTrack.getSources||function(callback){if(!callback)throw new TypeError("Failed to execute 'getSources' on 'MediaStreamTrack': 1 argument required, but only 0 present.");return callback([])},MediaStream.prototype.getVideoTracks||(MediaStream.prototype.getVideoTracks=function(){return[]}),MediaStream.prototype.getAudioTracks||(MediaStream.prototype.getAudioTracks=function(){return[]}),AdapterJS.maybeThroughWebRTCReady();else if(navigator.webkitGetUserMedia){webrtcDetectedBrowser="chrome",webrtcDetectedType="webkit",webrtcDetectedVersion=parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2],10);var checkIfOpera=navigator.userAgent.match(/\bOPR\/(\d+)/);null!==checkIfOpera&&(webrtcDetectedBrowser="opera",webrtcDetectedVersion=parseInt(checkIfOpera[1],10)),webrtcDetectedDCSupport="chrome"===webrtcDetectedBrowser&&webrtcDetectedVersion>=31||"opera"===webrtcDetectedBrowser&&webrtcDetectedVersion>=20?"SCTP":"chrome"===webrtcDetectedBrowser&&webrtcDetectedVersion<30&&webrtcDetectedVersion>24?"RTP":"",createIceServer=function(url,username,password){var iceServer=null,url_parts=url.split(":");return 0===url_parts[0].indexOf("stun")?iceServer={url:url}:0===url_parts[0].indexOf("turn")&&(iceServer={url:url,credential:password,username:username}),iceServer},createIceServers=function(urls,username,password){var iceServers=[];if(webrtcDetectedVersion>=34)iceServers={urls:urls,credential:password,username:username};else for(i=0;i<urls.length;i++){var iceServer=createIceServer(urls[i],username,password);null!==iceServer&&iceServers.push(iceServer)}return iceServers},RTCPeerConnection=function(pcConfig,pcConstraints){return webrtcDetectedVersion<34&&AdapterJS.maybeFixConfiguration(pcConfig),new webkitRTCPeerConnection(pcConfig,pcConstraints)},getUserMedia=navigator.webkitGetUserMedia.bind(navigator),navigator.getUserMedia=getUserMedia,attachMediaStream=function(element,stream){return"undefined"!=typeof element.srcObject?element.srcObject=stream:"undefined"!=typeof element.mozSrcObject?element.mozSrcObject=stream:"undefined"!=typeof element.src&&(element.src=URL.createObjectURL(stream)),element},reattachMediaStream=function(to,from){return to.src=from.src,to},AdapterJS.maybeThroughWebRTCReady()}else("object"!=typeof console||"function"!=typeof console.log)&&(console={}||console,console.log=function(){},console.info=function(){},console.error=function(){},console.dir=function(){},console.exception=function(){},console.trace=function(){},console.warn=function(){},console.count=function(){},console.debug=function(){},console.count=function(){},console.time=function(){},console.timeEnd=function(){},console.group=function(){},console.groupCollapsed=function(){},console.groupEnd=function(){}),webrtcDetectedType="plugin",webrtcDetectedDCSupport="plugin",AdapterJS.parseWebrtcDetectedBrowser(),isIE="IE"===webrtcDetectedBrowser,AdapterJS.WebRTCPlugin.WaitForPluginReady=function(){for(;AdapterJS.WebRTCPlugin.pluginState!==AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY;);},AdapterJS.WebRTCPlugin.callWhenPluginReady=function(callback){if(AdapterJS.WebRTCPlugin.pluginState===AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY)callback();else var checkPluginReadyState=setInterval(function(){AdapterJS.WebRTCPlugin.pluginState===AdapterJS.WebRTCPlugin.PLUGIN_STATES.READY&&(clearInterval(checkPluginReadyState),callback())},100)},AdapterJS.WebRTCPlugin.setLogLevel=function(logLevel){AdapterJS.WebRTCPlugin.callWhenPluginReady(function(){AdapterJS.WebRTCPlugin.plugin.setLogLevel(logLevel)})},AdapterJS.WebRTCPlugin.injectPlugin=function(){if("complete"===document.readyState&&AdapterJS.WebRTCPlugin.pluginState===AdapterJS.WebRTCPlugin.PLUGIN_STATES.INITIALIZING){if(AdapterJS.WebRTCPlugin.pluginState=AdapterJS.WebRTCPlugin.PLUGIN_STATES.INJECTING,"IE"===webrtcDetectedBrowser&&webrtcDetectedVersion<=10){var frag=document.createDocumentFragment();for(AdapterJS.WebRTCPlugin.plugin=document.createElement("div"),AdapterJS.WebRTCPlugin.plugin.innerHTML='<object id="'+AdapterJS.WebRTCPlugin.pluginInfo.pluginId+'" type="'+AdapterJS.WebRTCPlugin.pluginInfo.type+'" width="1" height="1"><param name="pluginId" value="'+AdapterJS.WebRTCPlugin.pluginInfo.pluginId+'" /> <param name="windowless" value="false" /> <param name="pageId" value="'+AdapterJS.WebRTCPlugin.pageId+'" /> <param name="onload" value="'+AdapterJS.WebRTCPlugin.pluginInfo.onload+'" />'+(AdapterJS.options.getAllCams?'<param name="forceGetAllCams" value="True" />':"")+"</object>";AdapterJS.WebRTCPlugin.plugin.firstChild;)frag.appendChild(AdapterJS.WebRTCPlugin.plugin.firstChild);document.body.appendChild(frag),AdapterJS.WebRTCPlugin.plugin=document.getElementById(AdapterJS.WebRTCPlugin.pluginInfo.pluginId)}else AdapterJS.WebRTCPlugin.plugin=document.createElement("object"),AdapterJS.WebRTCPlugin.plugin.id=AdapterJS.WebRTCPlugin.pluginInfo.pluginId,isIE&&(AdapterJS.WebRTCPlugin.plugin.width="1px",AdapterJS.WebRTCPlugin.plugin.height="1px"),AdapterJS.WebRTCPlugin.plugin.type=AdapterJS.WebRTCPlugin.pluginInfo.type,AdapterJS.WebRTCPlugin.plugin.innerHTML='<param name="onload" value="'+AdapterJS.WebRTCPlugin.pluginInfo.onload+'"><param name="pluginId" value="'+AdapterJS.WebRTCPlugin.pluginInfo.pluginId+'"><param name="windowless" value="false" /> '+(AdapterJS.options.getAllCams?'<param name="forceGetAllCams" value="True" />':"")+'<param name="pageId" value="'+AdapterJS.WebRTCPlugin.pageId+'">',document.body.appendChild(AdapterJS.WebRTCPlugin.plugin);AdapterJS.WebRTCPlugin.pluginState=AdapterJS.WebRTCPlugin.PLUGIN_STATES.INJECTED}},AdapterJS.WebRTCPlugin.isPluginInstalled=function(comName,plugName,installedCb,notInstalledCb){if(isIE){try{{new ActiveXObject(comName+"."+plugName)}}catch(e){return void notInstalledCb()}installedCb()}else{for(var pluginArray=navigator.plugins,i=0;i<pluginArray.length;i++)if(pluginArray[i].name.indexOf(plugName)>=0)return void installedCb();notInstalledCb()}},AdapterJS.WebRTCPlugin.defineWebRTCInterface=function(){AdapterJS.WebRTCPlugin.pluginState=AdapterJS.WebRTCPlugin.PLUGIN_STATES.INITIALIZING,AdapterJS.isDefined=function(variable){return null!==variable&&void 0!==variable},createIceServer=function(url,username,password){var iceServer=null,url_parts=url.split(":");return 0===url_parts[0].indexOf("stun")?iceServer={url:url,hasCredentials:!1}:0===url_parts[0].indexOf("turn")&&(iceServer={url:url,hasCredentials:!0,credential:password,username:username}),iceServer},createIceServers=function(urls,username,password){for(var iceServers=[],i=0;i<urls.length;++i)iceServers.push(createIceServer(urls[i],username,password));return iceServers},RTCSessionDescription=function(info){return AdapterJS.WebRTCPlugin.WaitForPluginReady(),AdapterJS.WebRTCPlugin.plugin.ConstructSessionDescription(info.type,info.sdp)},RTCPeerConnection=function(servers,constraints){var iceServers=null;if(servers){iceServers=servers.iceServers;for(var i=0;i<iceServers.length;i++)iceServers[i].urls&&!iceServers[i].url&&(iceServers[i].url=iceServers[i].urls),iceServers[i].hasCredentials=AdapterJS.isDefined(iceServers[i].username)&&AdapterJS.isDefined(iceServers[i].credential)}var mandatory=constraints&&constraints.mandatory?constraints.mandatory:null,optional=constraints&&constraints.optional?constraints.optional:null;return AdapterJS.WebRTCPlugin.WaitForPluginReady(),AdapterJS.WebRTCPlugin.plugin.PeerConnection(AdapterJS.WebRTCPlugin.pageId,iceServers,mandatory,optional)},MediaStreamTrack={},MediaStreamTrack.getSources=function(callback){AdapterJS.WebRTCPlugin.callWhenPluginReady(function(){AdapterJS.WebRTCPlugin.plugin.GetSources(callback)})},getUserMedia=function(constraints,successCallback,failureCallback){constraints.audio||(constraints.audio=!1),AdapterJS.WebRTCPlugin.callWhenPluginReady(function(){AdapterJS.WebRTCPlugin.plugin.getUserMedia(constraints,successCallback,failureCallback)})},navigator.getUserMedia=getUserMedia,attachMediaStream=function(element,stream){if(stream.enableSoundTracks(!0),"audio"!==element.nodeName.toLowerCase()){var elementId=0===element.id.length?Math.random().toString(36).slice(2):element.id;if(element.isWebRTCPlugin&&element.isWebRTCPlugin()){for(var children=element.children,i=0;i!==children.length;++i)if("streamId"===children[i].name){children[i].value=stream.id;break}element.setStreamId(stream.id)}else{var frag=document.createDocumentFragment(),temp=document.createElement("div"),classHTML=element.className?'class="'+element.className+'" ':"";for(temp.innerHTML='<object id="'+elementId+'" '+classHTML+'type="'+AdapterJS.WebRTCPlugin.pluginInfo.type+'"><param name="pluginId" value="'+elementId+'" /> <param name="pageId" value="'+AdapterJS.WebRTCPlugin.pageId+'" /> <param name="windowless" value="true" /> <param name="streamId" value="'+stream.id+'" /> </object>';temp.firstChild;)frag.appendChild(temp.firstChild);var rectObject=element.getBoundingClientRect();element.parentNode.insertBefore(frag,element),frag=document.getElementById(elementId),frag.width=rectObject.width+"px",frag.height=rectObject.height+"px",element.parentNode.removeChild(element)}var newElement=document.getElementById(elementId);return newElement.onplaying=element.onplaying?element.onplaying:function(){},isIE&&(newElement.attachEvent("onplaying",newElement.onplaying),newElement.onclick=element.onclick?element.onclick:function(){},newElement._TemOnClick=function(id){var arg={srcElement:document.getElementById(id)};newElement.onclick(arg)}),newElement}return element},reattachMediaStream=function(to,from){for(var stream=null,children=from.children,i=0;i!==children.length;++i)if("streamId"===children[i].name){AdapterJS.WebRTCPlugin.WaitForPluginReady(),stream=AdapterJS.WebRTCPlugin.plugin.getStreamWithId(AdapterJS.WebRTCPlugin.pageId,children[i].value);break}return null!==stream?attachMediaStream(to,stream):void 0},RTCIceCandidate=function(candidate){return candidate.sdpMid||(candidate.sdpMid=""),AdapterJS.WebRTCPlugin.WaitForPluginReady(),AdapterJS.WebRTCPlugin.plugin.ConstructIceCandidate(candidate.sdpMid,candidate.sdpMLineIndex,candidate.candidate)},AdapterJS.addEvent(document,"readystatechange",AdapterJS.WebRTCPlugin.injectPlugin),AdapterJS.WebRTCPlugin.injectPlugin()},AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb=function(){AdapterJS.addEvent(document,"readystatechange",AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv),AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv()},AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCbPriv=function(){if(!AdapterJS.options.hidePluginInstallPrompt){var downloadLink=AdapterJS.WebRTCPlugin.pluginInfo.downloadLink;if(downloadLink){var popupString;popupString=AdapterJS.WebRTCPlugin.pluginInfo.portalLink?'This website requires you to install the  <a href="'+AdapterJS.WebRTCPlugin.pluginInfo.portalLink+'" target="_blank">'+AdapterJS.WebRTCPlugin.pluginInfo.companyName+" WebRTC Plugin</a> to work on this browser.":"This website requires you to install a WebRTC-enabling plugin to work on this browser.",AdapterJS.WebRTCPlugin.renderNotificationBar(popupString,"Install Now",downloadLink)}else AdapterJS.WebRTCPlugin.renderNotificationBar("Your browser does not support WebRTC.")}},AdapterJS.WebRTCPlugin.renderNotificationBar=function(text,buttonText,buttonLink){if("complete"===document.readyState){var w=window,i=document.createElement("iframe");i.style.position="fixed",i.style.top="-41px",i.style.left=0,i.style.right=0,i.style.width="100%",i.style.height="40px",i.style.backgroundColor="#ffffe1",i.style.border="none",i.style.borderBottom="1px solid #888888",i.style.zIndex="9999999","string"==typeof i.style.webkitTransition?i.style.webkitTransition="all .5s ease-out":"string"==typeof i.style.transition&&(i.style.transition="all .5s ease-out"),document.body.appendChild(i),c=i.contentWindow?i.contentWindow:i.contentDocument.document?i.contentDocument.document:i.contentDocument,c.document.open(),c.document.write('<span style="font-family: Helvetica, Arial,sans-serif; font-size: .9rem; padding: 7px; vertical-align: middle; cursor: default;">'+text+"</span>"),buttonText&&buttonLink?(c.document.write('<button id="okay">'+buttonText+"</button><button>Cancel</button>"),c.document.close(),AdapterJS.addEvent(c.document.getElementById("okay"),"click",function(e){window.open(buttonLink,"_top"),e.preventDefault();try{event.cancelBubble=!0}catch(error){}})):c.document.close(),AdapterJS.addEvent(c.document,"click",function(){w.document.body.removeChild(i)}),setTimeout(function(){"string"==typeof i.style.webkitTransform?i.style.webkitTransform="translateY(40px)":"string"==typeof i.style.transform?i.style.transform="translateY(40px)":i.style.top="0px"},300)}},AdapterJS.WebRTCPlugin.isPluginInstalled(AdapterJS.WebRTCPlugin.pluginInfo.prefix,AdapterJS.WebRTCPlugin.pluginInfo.plugName,AdapterJS.WebRTCPlugin.defineWebRTCInterface,AdapterJS.WebRTCPlugin.pluginNeededButNotInstalledCb);/**
 * Created by mohamed on 30/03/2015.
 */