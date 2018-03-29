var username = 'demo';
var password = 'demo'; 
var chekrows = [];
var userId = '';
/******* View Commission Reports ******/
function addSendme(){			
	jQuery('#sendall').on('click', function(e) {
		 if(jQuery(this).is(':checked',true)){
			console.log('true');
			jQuery('td input[type="checkbox"]').prop('checked', true); 
			jQuery('.sendemailtoagent').show(); 
			jQuery('td input[type="checkbox"]').each( 
			function () {
				if (chekrows.indexOf(this.id)==-1) {
					chekrows.push(this.id);
				}
			});
		 }else{  
			console.log('false');
			jQuery('td input[type="checkbox"]').prop('checked',false);
			jQuery('.sendemailtoagent').hide(); 
			chekrows = []; 
		 }
		 console.log(chekrows);
	});
	
	jQuery('td input[type="checkbox"]').on('click', function(e) {
		var mid = jQuery(this).attr('id');
		//console.log(mid);
		if(jQuery(this).is(':checked',true)){
			console.log('true11');
			jQuery(this).prop('checked', true);  
			//jQuery('#sendall').prop('checked', true);
		}else{  
			console.log('false22');
			jQuery(this).prop('checked',false); 
			//index = chekrows.indexOf(id);
			//chekrows.splice(index, 1);
			chekrows = jQuery.grep(chekrows, function(value) {
			  return value != mid;
			});
			jQuery('#sendall').prop('checked', false);
		}
		console.log(chekrows);
   });		
}	

function checkInput(){
	if(jQuery("input#sendall").parents("tr th.views-field.views-field-php").length == 0){
		var chkbxsl = '<input type="checkbox" id="sendall" name="sendall" class="sendall">'; 
		jQuery('tr th.views-field.views-field-php').html(chkbxsl);
		addSendme();
		//console.log('checkin');
	}
}
jQuery( document ).ready(function() {
  var pophtml = '<div class="container"><button type="button" class="btn btn-info btn-lg apimodal" data-toggle="modal" data-target="#mssageModal" style="display:none;">Open Modal</button><div class="modal fade" id="mssageModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">ADMIN COMMISSION REPORTS</h4></div><div class="modal-body"><p></p></div><div class="modal-footer"></div></div></div></div></div>';
  jQuery('#block-system-main').after(pophtml);
  /*var ldrspan = '<span class="ldr"></span>';
  jQuery('.apibutton').before(ldrspan);*/
  
  var chkbxsl = '<input type="checkbox" id="sendall" name="sendall" class="sendall">'; 
  jQuery('tr th.views-field.views-field-php').html(chkbxsl);
  var d = new Date(),
		m = d.getMonth(),
		y = d.getFullYear();
	  
	  //jQuery("#edit-field-first-name-value").val();
	  jQuery("#edit-field-commission-add-date-value-value-year").val(y);
	  jQuery("#edit-field-commission-add-date-value-1-value-month").val(m+1);
	  
	  setTimeout(function() { jQuery('.sendemailtoagent').hide(); }, 3000);
	  	  
	  setInterval('checkInput();', 1000);
  
	  jQuery( "#edit-submit-commision-report-testing-only" ).trigger( "click" );
	  
});

function sendemailtoagent(id){

	if(jQuery('table td input[type=checkbox]:checked').length) { 
		jQuery('.sendemailtoagent').show(); 
	}else{ 
		jQuery('.sendemailtoagent').hide(); 
	}

	if (chekrows.indexOf(id)==-1) {
		chekrows.push(id);
	}
	console.log(chekrows);
}

function SendemailtoagentAjaxConfirm(confirmMessage,callback){
    confirmMessage = confirmMessage || '';

    $('#mssageModal .modal-body p').html(confirmMessage);
    $('#mssageModal').modal({show:true,backdrop:false,keyboard: false});
    $('.cancel').click(function(){
        $('#mssageModal').modal('hide');
        //if (callback) callback(false);

    });
    $('.confirm').click(function(){
    	$('.ldr2').show();
        $('#mssageModal').modal('hide');
        if (callback) callback(true);
    });
    
}

function sendemailtoagentAjax(chekrows, e){
	SendemailtoagentAjaxConfirm('<p>Are you sure ?</p><button type="button" class="confirm">Confirm</button>&nbsp;&nbsp;<button type="button" class="cancel" data-dismiss="modal">Cancel</button>',function(e) {
		
		$('.ldr2').show();

	  	setTimeout(
	  		function() {
				$.ajax({
					type: "POST",
					data: 'ids='+chekrows,
					url: "http://demo.com/demo_api",
					cache: false,
					beforeSend: function (xhr) {
					    xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
					},
					success: function (d) {
						console.log('s2m2');
						$('.ldr2').hide();
						$('#mssageModal .modal-body p').text(d);
						$("#mssageModal").modal('show');			
						chekrows =[];
						//window.setTimeout(function(){location.reload()},2000);
					},
					error: function (d) {
						console.log(d);
						console.log('e2m1');
						$('.ldr2').hide();
						$('#mssageModal .modal-body p').text(d);
						$("#mssageModal").modal('show');
					}
				});
		    },
		1000);	
	});  
}

function CalltoCommissionApiConfirm(confirmMessage,callback){
    confirmMessage = confirmMessage || '';

    $('#mssageModal .modal-body p').html(confirmMessage);
    $('#mssageModal').modal({show:true,backdrop:false,keyboard: false});
    $('.cancel').click(function(){
        $('#mssageModal').modal('hide');
        //if (callback) callback(false);
    });
    $('.confirm').click(function(){
    	$('.ldr2').show();
        $('#mssageModal').modal('hide');
        if (callback) callback(true);
    });
    
}	

function CalltoCommissionApi(){
	console.log('I reached here.'); 
	CalltoCommissionApiConfirm('<p>Are you sure ?</p><button type="button" class="confirm">Confirm</button>&nbsp;&nbsp;<button type="button" class="cancel" data-dismiss="modal">Cancel</button>',function(e) {
	  
		var yr = $('#edit-field-commission-add-date-value-value-year').val();
		var mn = $('#edit-field-commission-add-date-value-1-value-month').val();
		  
		//var jsondata = {month: 3, year: 2018};
		var jsondata = {month: mn, year: yr};
		console.log(jsondata);

		$('.ldr2').show();

		setTimeout(
			function() {
				$.ajax({
					type: "POST",
					data: JSON.stringify(jsondata),
					dataType: "json",
					contentType: 'application/json; charset=utf-8',
					url: "http://demo.com/demo_api",
					crossDomain: true,
					beforeSend: function (xhr) {
					    xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
					},
					success: function (d) {
						console.log('s22');
						//$('.ldr img').remove();
						$('.ldr2').hide();
						$('#mssageModal .modal-body').html('<p></p>');
						$('#mssageModal .modal-body p').text(d.message);
						$("#mssageModal").modal('show');
					},
					error: function (d) {
						console.log(d);
						console.log('e21');
						//$('.ldr img').remove();
						$('.ldr2').hide();
						$('#mssageModal .modal-body').html('<p></p>');
						$('#mssageModal .modal-body p').text(d.message);
						$("#mssageModal").modal('show');
					}
				});
			},
		1000);
    });
}


/***** Agents IDs *****/

function ConfirmFirst(confirmMessage,callback){
    confirmMessage = confirmMessage || '';

    $('#mssageModal .modal-body p').html(confirmMessage);
    $('#mssageModal').modal({show:true,backdrop:false,keyboard: false});
    $('.cancel').click(function(){
        $('#mssageModal').modal('hide');
        //if (callback) callback(false);
    });
    $('.confirm').click(function(){
    	//$('.ldr2').show();
        $('#mssageModal').modal('hide');
        if (callback) callback(true);
    });
    
}

function SaveAgentID(uid, agentid){
		console.log(uid);
		console.log(agentid);

	  	setTimeout(
	  		function() {
				$.ajax({
					type: "POST",
					url: "http://demo.com/demo_api",
					data: "uid="+uid+"&agentid="+agentid,
					cache: false,
					success: function (d) {
						console.log('s2m2');
						//$('.ldr2').hide();
						$('#mssageModal .modal-body').html('<p>'+d+'</p>');
						$("#mssageModal").modal('show');			

					},
					error: function (d) {
						console.log('e2m1');
						//$('.ldr2').hide();
						$('#mssageModal .modal-body').html('<p>'+d+'</p>');
						$("#mssageModal").modal('show');
					}
				});
		    },
		1000);	
	
}

function getAgentId(email,userId){
	console.log(email);
	$(this).find('.ldr2').show();
	//$(this).closest(".ldr2").show();
	console.log(userId);
	ConfirmFirst('<p>Are you sure ?</p><button type="button" class="confirm">Confirm</button>&nbsp;&nbsp;<button type="button" class="cancel" data-dismiss="modal">Cancel</button>',function(e) {
		
		jsondata = {"email":email};
		$.ajax({
			type: "POST",
			data: JSON.stringify(jsondata),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			url: "http://demo.com/demo_api",
			beforeSend: function (xhr) {
			    xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
			},
			crossDomain: true,
			success: function (d) {
				console.log('s212-'+ userId);
				var AgentId = JSON.parse(d.agentId);
				//userID = 160;
				SaveAgentID(userId, AgentId);
				//$('.ldr2').hide();
				//$('#mssageModal .modal-body').html('<p>'+JSON.parse(d.agentId)+'</p>');
				//$("#mssageModal").modal('show');
			},
			error: function (d) {
				console.log(d);
				console.log('e21');
				
				$('.ldr2').hide();
				$('#mssageModal .modal-body').html('<p>'+d.message+'</p>');
				$("#mssageModal").modal('show');
			}
		});

	});	
}
