$(document).ready(function(){
	setIdealBudget($("#idealBudget").val());
    $("#idealBudget").on("input change", function() {
    	setIdealBudget($(this).val());
    });
	$("#collapse-icon").click(function(){
		$(this).find("i").toggleClass("fa-chevron-up");
		$(this).find("i").toggleClass("fa-chevron-down");
	})

	$("#seeResults").click(function(){
		calculateBudget();
	})

	function setIdealBudget(val){
		var num = parseInt(val);
        $("#result #amount").html(currencyFormat(num));
	}

	function calculateBudget(){
		//calc question 1
		var A_i_SUM = 0;
		var A_i_QTY = 0;
		var FACTOR = 0.6;
		$(".question-1:checked").each(function(){
			A_i_SUM += parseInt($(this).val());
			A_i_QTY++;
		});
		var A_i_AVG = A_i_SUM/A_i_QTY;
		A_i_AVG = isNaN(A_i_AVG)?0:A_i_AVG;
		//calc question 1 ends

		//calc question 2 a Production Value
		A_i_AVG = A_i_AVG*Number($(".question-2-a").val());
		//calc question 2 a ends

		//calc question 2 b Final B_i SUM: Actor Level Length [Factor] Post-Production
		B_i_SUM = 0;
		$(".question-2-b:checked").each(function(){
			B_i_SUM += parseInt($(this).val());
		});
		//calc question 2 b ends

		// calc A_i AVG*Factor factor
		A_i_AVG = A_i_AVG * FACTOR;
		if($("#B13:checked").prop("checked") == true)
			A_i_AVG = A_i_AVG * 1.5;
		// calc A_i AVG*Factor factor ends

		//calc intermediate 1
		var intermediate1 = A_i_AVG + B_i_SUM;
		//calc intermediate 1 ends

		//calc Distribution Channels:
		var distribution_channel_QTY = 0;
		$(".question-3:checked").each(function(){
			distribution_channel_QTY++;
		});
		var intermediate2 = intermediate1 + (distribution_channel_QTY*500)
		//calc Distribution Channels ends		

		//calc idealBudget
		var idealBudget = parseInt($("#idealBudget").val());
		//calc idealBudget ends

		//calc timeLine
		var timeLine = parseInt($("#timeLine").val());
		//calc timeLine ends

		var final_mid_price = (intermediate2+idealBudget)/2;
		final_mid_price = final_mid_price - (final_mid_price % 10);

		//calc fast delivery
		if(timeLine <= 2)
			final_mid_price = final_mid_price * 1.5;
		//calc fast delivery

		var final_upper_price = final_mid_price * 1.1;
		final_upper_price = final_upper_price - (final_upper_price % 10);

		var final_lower_price = final_mid_price * 0.8;
		final_lower_price = final_lower_price - (final_lower_price % 10);


		//write results
		$("#final-lower-price span").html(currencyFormat(final_lower_price));
		$("#final-upper-price span").html(currencyFormat(final_upper_price));
		//write results end

		console.log(final_lower_price,final_upper_price);
	}

	function currencyFormat(amount){
		const options2 = { style: 'currency', currency: 'USD', minimumFractionDigits: 0, };
		const numberFormat2 = new Intl.NumberFormat('en-US', options2);
		return numberFormat2.format(amount)
	}

	$("input, select").on("input change", function() {
		$("#collapseResults").removeClass('show');
	})
})