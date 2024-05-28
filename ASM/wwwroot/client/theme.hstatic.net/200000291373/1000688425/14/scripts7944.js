var CR = {
	init: function() {
		this.Main.init();
		if(template.indexOf("index") != -1){
			this.Index.init();
		}
		if(template == "cart"){
			this.Cart.init();
		}
	}
}
$(document).ready(function() {
	CR.init();
});

CR.Main = {
	init: function(){
		this.scrollFixedHeader();
		this.searchAuto();
		this.actionIconHeader();
		this.menuMobile();
		this.toggleSidebar();
		this.footerAccordion();
		this.addListSharing();
		this.recapcha();
		this.triggerQuickviewStyle1();
		this.triggerQuickviewStyle2();
		this.showQuickView();
		this.orderFunction();
		this.smoothScroll();
	},
	deleteCart: function(line){
		var params = {
			type: "POST",
			url: "/cart/change.js",
			data: "quantity=0&line=" + line,
			dataType: "json",
			success: function(cart) {
				CR.Main.getModalCart();
				if(template == "index"){
					$.ajax({
						type:"GET",
						url: "/cart?view=update",
						success: function(data){
							$(".orders-cart--ajax-here").html(data);
						}
					});
				}
			},
			error: function(XMLHttpRequest, textStatus) {
				Haravan.onError(XMLHttpRequest, textStatus);
			}
		};
		jQuery.ajax(params);
	},
	cloneItem: function(product,i){
		var item_product = jQuery("#clone-item-cart").find(".item_2");
		if ( product.image == null ) {
			item_product.find("img").attr("src","//theme.hstatic.net/200000291373/1000688425/14/no_image.jpg?v=123").attr("alt", product.url);
		} else {
			item_product.find("img").attr("src",Haravan.resizeImage(product.image,"small")).attr("alt", product.url);
		}
		item_product.find("a:not(.remove-cart)").attr("href", product.url).attr("title", product.url);
		item_product.find(".pro-title-view").html(product.title);
		item_product.find(".pro-quantity-view .qty-value").html(product.quantity);
		item_product.find(".pro-price-view").html(Haravan.formatMoney(product.price,formatMoney));
		item_product.find(".remove-cart").html("<a href="javascript:void(0);" onclick="CR.Main.deleteCart(" + (i+1) + ")" ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"> <g><path d="M500,442.7L79.3,22.6C63.4,6.7,37.7,6.7,21.9,22.5C6.1,38.3,6.1,64,22,79.9L442.6,500L22,920.1C6,936,6.1,961.6,21.9,977.5c15.8,15.8,41.6,15.8,57.4-0.1L500,557.3l420.7,420.1c16,15.9,41.6,15.9,57.4,0.1c15.8-15.8,15.8-41.5-0.1-57.4L557.4,500L978,79.9c16-15.9,15.9-41.5,0.1-57.4c-15.8-15.8-41.6-15.8-57.4,0.1L500,442.7L500,442.7z"/></g> </svg></a>");
		var title = "";
		if(product.variant_options.indexOf("Default Title") == -1){
			$.each(product.variant_options,function(i,v){
				title = title + v + " / ";
			});
			title = title + "@@";
			title = title.replace(" / @@","")
			item_product.find(".variant").html(title);
		}else {
			item_product.find(".variant").html("");
		}
		item_product.clone().removeClass("hidden").prependTo("#cart-view");
	},
	getModalCart: function(show){
		var cart = null;
		jQuery.getJSON("/cart.js", function(cart, textStatus) {
			if(cart) {
				if (cart.item_count == 0){
					$(".btn-check a").addClass("disabled");
				}
				else{
					$(".btn-check a").removeClass("disabled");
				}
				$(".count-holder").html(cart.item_count);
				if($(".sticky-right").hasClass("active")){
					$(".cart-mobile .flex-box").html("<span>"+cart.items.length+" Món</span><span>"+Haravan.formatMoney(cart.total_price, formatMoney)+"</span><span>Đóng</span>");
				}
				else{
					$(".cart-mobile .flex-box").html("<span>"+cart.items.length+" Món</span><span>"+Haravan.formatMoney(cart.total_price, formatMoney)+"</span><span>Xem chi tiết</span>");
				}
				$(".count-holder").html(cart.item_count);
				$(".cart-mobile .flex-box").html("<span>"+cart.items.length+" Món</span><span>"+Haravan.formatMoney(cart.total_price, "")+"</span><span>Đóng</span>");
				if(cart.item_count == 0){				
					jQuery("#cart-view").html("<tr class="item-cart_empty"><td><div class="svgico-mini-cart"> <svg width="81" height="70" viewBox="0 0 81 70"><g transform="translate(0 2)" stroke-width="4" stroke="#ff0100" fill="none" fill-rule="evenodd"><circle stroke-linecap="square" cx="34" cy="60" r="6"></circle><circle stroke-linecap="square" cx="67" cy="60" r="6"></circle><path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path></g></svg></div> Hiện chưa có sản phẩm</td></tr>");
				}
				else{			
					jQuery("#cart-view").html("");
				}
				jQuery.each(cart.items,function(i,item){
					CR.Main.cloneItem(item,i);
				});
				jQuery("#total-view-cart").html(Haravan.formatMoney(cart.total_price, formatMoney));
			}
			else{
				jQuery("#cart-view").html("<tr class="item-cart_empty"><td><div class="svgico-mini-cart"> <svg width="81" height="70" viewBox="0 0 81 70"><g transform="translate(0 2)" stroke-width="4" stroke="#ff0100" fill="none" fill-rule="evenodd"><circle stroke-linecap="square" cx="34" cy="60" r="6"></circle><circle stroke-linecap="square" cx="67" cy="60" r="6"></circle><path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path></g></svg></div> Hiện chưa có sản phẩm</td></tr>");
			}
		});
		if(show != false){
			if(!$(".header-action_cart").hasClass("js-action-show")){
				$("body").removeClass("locked-scroll");
				$(".header-action-item").removeClass("js-action-show");
			}
			if($(".mainHeader").hasClass("hSticky")){
				$(".mainHeader").addClass("hSticky-nav");
				setTimeout(function(){
					$(".mainHeader").addClass("hSticky-up");
				}, 300);
				setTimeout(function(){
					$(".header-action_cart").addClass("js-action-show");
					$("body").addClass("locked-scroll");
				}, 500);
			}
			else{
				$(".header-action_cart").addClass("js-action-show");
				$("body").addClass("locked-scroll");
				jQuery("html, body").animate({
					scrollTop: 0			
				}, 600);
			}
		}
	},
	boxAccount: function(type){
		$(".site_account .site_account_panel_list .site_account_panel ").removeClass("is-selected");
		var newheight = $(".site_account .site_account_panel_list .site_account_panel#" + type).addClass("is-selected").height();
		if($(".site_account_panel").hasClass("is-selected")){
			$(".site_account_panel_list").css("height", newheight);
		}
	},
	scrollFixedHeader: function(){
		var $parentHeader = $(".mainHeader--height");
		var parentHeight = $parentHeader.find(".mainHeader").outerHeight();
		var $header = $(".mainHeader"),  $body = $("body");
		var offset_sticky_header = $header.outerHeight() + 100;
		var offset_sticky_down = 0;
		$parentHeader.css("min-height", parentHeight );	
		var resizeTimer = false,
				resizeWindow = $(window).prop("innerWidth");
		$(window).on("resize", function() {
			if (resizeTimer) {clearTimeout(resizeTimer)	}
			resizeTimer = setTimeout(function() {
				var newWidth = $(window).prop("innerWidth");
				if (resizeWindow != newWidth) {
					$header.removeClass("hSticky-up").removeClass("hSticky-nav").removeClass("hSticky");
					$parentHeader.css("min-height", "" );	
					resizeTimer = setTimeout(function() {
						parentHeight = $parentHeader.find(".mainHeader").outerHeight();
						$parentHeader.css("min-height", parentHeight );	
					}, 50);
					resizeWindow = newWidth
				}
			}, 200)
		});
		setTimeout(function() {
			$parentHeader.css("min-height", "" );		
			parentHeight = $parentHeader.find(".mainHeader").outerHeight();
			$parentHeader.css("min-height", parentHeight );	
			jQuery(window).scroll(function() {	
				/* scroll header */
				if(jQuery(window).scrollTop() > offset_sticky_header && jQuery(window).scrollTop() > offset_sticky_down) {		
					if(jQuery(window).width() > 991){		
						$("body").removeClass("locked-scroll");
						$(".header-action-item").removeClass("js-action-show");
					}		
					$header.addClass("hSticky");	
					$body.addClass("scroll-body");
					var height_head = $(".mainHeader-middle").outerHeight();
					$("html").attr("style","--header-height:"+height_head+"px;");
					if(jQuery(window).scrollTop() > offset_sticky_header + 150){
						$header.removeClass("hSticky-up").addClass("hSticky-nav");	
						$body.removeClass("scroll-body-up").addClass("scroll-body-nav");
					};
				} 
				else {
					if(jQuery(window).scrollTop() > offset_sticky_header + 150 && (jQuery(window).scrollTop() - 150) + jQuery(window).height()  < $(document).height()) {
						$header.addClass("hSticky-up");	
						$body.addClass("scroll-body-up");
						var height_head = $(".mainHeader-middle").outerHeight();
						$("html").attr("style","--header-height:"+height_head+"px;");
					}	
				}
				if (jQuery(window).scrollTop() <= offset_sticky_down && jQuery(window).scrollTop()   <= offset_sticky_header ) {
					$header.removeClass("hSticky-up").removeClass("hSticky-nav");
					$body.removeClass("scroll-body-up").removeClass("scroll-body-nav").removeClass("scroll-body");
					var height_head = $(".mainHeader--height").outerHeight();
					$("html").attr("style","--header-height:"+height_head+"px;");
					if(jQuery(window).scrollTop()  <= offset_sticky_header - 100){
						$header.removeClass("hSticky");
					}
				}
				offset_sticky_down = jQuery(window).scrollTop();
			});	
		}, 300)
	},
	searchAuto: function(){
		$(".ultimate-search").submit(function(e) {
			e.preventDefault();
			var q = $(this).find("input[name=q]").val();
			if(q.indexOf("script") > -1 || q.indexOf(">") > -1){
				alert("Từ khóa của bạn có chứa mã độc hại ! Vui lòng nhập lại key word khác");
				$(this).find("input[name=q]").val("");
			}else{
				var q_follow = "product";
				var query = encodeURIComponent(q);
				if( !q ) {
					window.location = "/search?type="+ q_follow +"&q=";
					return;
				}	
				else {
					window.location = "/search?type=" + q_follow +"&q=" + query;
					return;
				}
			}
		});
		var $input = $(".ultimate-search input[type="text"]");
		$input.bind("keyup change paste propertychange", function() {
			var key = $(this).val(),
					$parent = $(this).parents(".wpo-wrapper-search"),
					$results = $(this).parents(".wpo-wrapper-search").find(".smart-search-wrapper");
			if(key.indexOf("script") > -1 || key.indexOf(">") > -1){
				alert("Từ khóa của bạn có chứa mã độc hại ! Vui lòng nhập lại key word khác");
				$(this).val("");
				$(".ultimate-search input[type="text"]").val("");
			}
			else{
				if(key.length > 0 ){
					$(".ultimate-search input[type="text"]").val($(this).val());
					$(this).attr("data-history", key);
					var q_follow = "product",
							str = "";
					str = "/search?type=product&q="+ key + "&view=ultimate-product";
					$.ajax({
						url: str,
						type: "GET",
						async: true,
						success: function(data){
							$results.find(".resultsContent").html(data);
						}
					})
					if(!$(".header-action_search").hasClass("show-action")){
						$("body").removeClass("locked-scroll");
						$(".header-action").removeClass("show-action");
					}
					$(".search-bar-mobile .ultimate-search").addClass("expanded");
					$results.fadeIn();
				}
				else{
					$(".ultimate-search input[type="text"]").val($(this).val());
					$(".search-bar-mobile .ultimate-search").removeClass("expanded");
					$results.fadeOut();
				}
			}
		})
		$("body").click(function(evt) {
			var target = evt.target;
			if (target.id !== "ajaxSearchResults" && target.id !== "inputSearchAuto") {
				$(".ajaxSearchResults").hide();
			}
			if (target.id !== "ajaxSearchResults-3" && target.id !== "inputSearchAuto-3") {
				$("#ajaxSearchResults-3").hide();
			}
			if (target.id !== "ajaxSearchResults-mb" && target.id !== "inputSearchAuto-mb") {
				$(".ajaxSearchResults").hide();
			}
		});
		$("body").on("click", ".ultimate-search input[type="text"]", function() {
			if ($(this).is(":focus")) {
				if ($(this).val() != "") {
					$(".ajaxSearchResults").show();
				}
			} else {

			}
		})
		$("body").on("click", ".ultimate-search .close-search", function(e){
			e.preventDefault();
			$(".ajaxSearchResults").hide();
			$(".ultimate-search").removeClass("expanded");
			$(".ultimate-search").find("input[name=q]").val("");
		})
	},
	actionIconHeader: function(){
		$(".header-action_clicked").click(function(e){
			e.preventDefault();		
			if($(this).parents(".header-action-item").hasClass("js-action-show")){
				$("body").removeClass("locked-scroll");
				$(this).parents(".header-action-item").removeClass("js-action-show");
			}
			else{
				$(".header-action-item").removeClass("js-action-show");
				$("body").addClass("locked-scroll");
				$(this).parents(".header-action-item").addClass("js-action-show");		
			}		
		});
		$("body").on("click", ".js-link", function(e){
			e.preventDefault();
			CR.Main.boxAccount($(this).attr("aria-controls"));
		});
		$("body").on("click", "#site-overlay", function(e){
			$("body").removeClass("locked-scroll");
			$(".header-action-item").removeClass("js-action-show");
		});
		$(".site_account input").blur(function(){
			var tmpval = $(this).val();
			if(tmpval == "") {
				$(this).removeClass("is-filled");
			} else {
				$(this).addClass("is-filled");
			}
		});
	},
	menuMobile: function(){
		$(".btn-menu-mobile").click(function(){
			$("body").addClass("show-menu-mobile");
			$(".cart-mobile").parent(".sticky-right").addClass("modal-quickview-show")
		});
		$("#overlay-menu-mobile").click(function(){
			$("body").removeClass("show-menu-mobile");
			$(".cart-mobile").parent(".sticky-right").removeClass("modal-quickview-show")
		});
		$(".toggle-sub-menu").click(function(){
			$(this).next().slideToggle();
			$(this).find("i").toggleClass("fa-minus");
		});
		$(".list-root li a").click(function(e){
			if ($(this).find("i").length){
				e.preventDefault();
				var menu_child_id = $(this).parent().data("menu-root");
				$(".list-root").addClass("mm-subopened");
				$("#" + menu_child_id).addClass("mm-opened");
			} 
		})
		$(".list-child li:first-child a").click(function(){
			$(this).parents(".list-child").removeClass("mm-opened");
			$(".list-root").removeClass("mm-subopened");
		})
		$(".list-child li.level-2 a").click(function(e){
			if ($(this).find("i").length){
				e.preventDefault();
				var menu_sub_id = $(this).parent().data("menu-root");
				$("li.level-2").addClass("mm-subopened");
				$("#" + menu_sub_id).addClass("mm-sub");
			} 
		})
		$(".sub-child li:first-child a").click(function(){
			$(this).parents(".sub-child").removeClass("mm-sub");
			$(".list-child").removeClass("mm-subopened");
		})
		$(document).on("click",".sub-child li.level-3 a",function(e){
			if ($(this).find("i").length){
				e.preventDefault();
				var menu_subnav_id = $(this).parent().data("menu-root");
				$("li.level-3").addClass("mm-open-3");
				$("#" +  menu_subnav_id).addClass("mm-sub-3");
			} 
		});
		$(document).on("click",".sub-child-3 li:first-child a",function(e){
			$(this).parents(".sub-child-3").removeClass("mm-sub-3");
			$(".sub-child").removeClass("mm-open-3");
		});
	},
	toggleSidebar: function() {
		$(".plus-nClick1").click(function(e){
			e.preventDefault();
			$(this).parents(".level0").toggleClass("opened");
			$(this).parents(".level0").children("ul").slideToggle(200);
		});
		$(".plus-nClick2").click(function(e){
			e.preventDefault();
			$(this).parents(".level1").toggleClass("opened");
			$(this).parents(".level1").children("ul").slideToggle(200);
		});
	},
	footerAccordion: function(){
		if (jQuery(window).width() < 768) {
			jQuery(".footer .footer-col .footer-title").on("click", function(){
				jQuery(this).toggleClass("active").parent().find(".footer-content").stop().slideToggle("medium");
			});
		}
	},
	addListSharing: function(){
		if ($(".addThis_listSharing").length > 0){
			$(window).scroll(function(){
				if(jQuery(window).scrollTop() > 100 ) {
					jQuery(".addThis_listSharing").addClass("is-show");
				} else {
					jQuery(".addThis_listSharing").removeClass("is-show");
				}
			});
			$(".content_popupform form.contact-form").submit(function(e){
				e.preventDefault();		
				$.ajax({
					type: "POST",
					url:"/contact",
					data: $(".content_popupform form.contact-form").serialize(),				 
					success:function(data){		
						$(".modal-contactform.fade.in").modal("hide");
						setTimeout(function(){ 		
							$(".modal-succesform").modal("show");					
							setTimeout(function(){							
								$(".modal-succesform.fade.in").modal("hide");
							}, 5000);
						},300);
					}			
				})
			});
			$(".modal-succesform").on("hidden.bs.modal", function() {			
				location.reload();
			});
		}
		if ($(".layoutProduct_scroll").length > 0 && jQuery(window).width() < 768) {
			var curScrollTop = 0;
			$(window).scroll(function(){	
				var scrollTop = $(window).scrollTop();
				if(scrollTop > curScrollTop  && scrollTop > 200 ) {
					$(".layoutProduct_scroll").removeClass("scroll-down").addClass("scroll-up");
				}
				else {
					if (scrollTop > 200 && scrollTop + $(window).height() + 150 < $(document).height()) {
						$(".layoutProduct_scroll").removeClass("scroll-up").addClass("scroll-down");	
					}
				}
				if(scrollTop < curScrollTop  && scrollTop < 200 ) {
					$(".layoutProduct_scroll").removeClass("scroll-up").removeClass("scroll-down");
				}
				curScrollTop = scrollTop;
			});
		}
	},
	recapcha: function(){
		$("#header-login-panel form#customer_login").submit(function(e) { 
			var self = $(this);
			if($(this)[0].checkValidity() == true){
				e.preventDefault();
				grecaptcha.ready(function() {
					grecaptcha.execute("6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-", {action: "submit"}).then(function(token) {
						self.find("input[name="g-recaptcha-response"]").val(token);
						self.unbind("submit").submit();
					}); 
				});
			}
		});
		$("#header-recover-panel form").submit(function(e) { 
			var self = $(this);
			if($(this)[0].checkValidity() == true){
				e.preventDefault();
				grecaptcha.ready(function() {
					grecaptcha.execute("6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-", {action: "submit"}).then(function(token) {
						self.find("input[name="g-recaptcha-response"]").val(token);
						self.unbind("submit").submit();
					}); 
				});
			}
		});
	},
	triggerQuickviewStyle1: function(){
		if (window.location.href.indexOf("?p=") != -1){
			var handle = window.location.href.split("?p=")[1];
			var handle_pro = $(".ajax-here .product-block[data-value=""+handle+""] .pro-btn-order").attr("data-link");
			$.ajax({
				url:handle_pro +"?view=quickview",
				success:function(e){
					$("#quick-view-modal").html(e);									
					$("#quick-view-modal").modal("show");
					$("#quick-view-modal").on("shown.bs.modal", function () {
						if($("#quickview-des__toggle").height() > 150){ 
							$("#quickview-des__toggle").addClass("opened"); 
							$(".quickview-des__trigger .btn-toggle").addClass("btn-viewmore").find("span").html("Xem thêm chi tiết sản phẩm +");
						}						
					});
				}
			})
		}
	},
	triggerQuickviewStyle2: function(){
		if (window.location.href.indexOf("?p=") != -1){
			var handle = window.location.href.split("?p=")[1];
			var handle_pro = $(".order-item[data-value=""+handle+""]").attr("data-link");
			$.ajax({
				url:handle_pro +"?view=quickview",
				success:function(e){
					$("#quick-view-modal").html(e);									
					$("#quick-view-modal").modal("show");
					$("#quick-view-modal").on("shown.bs.modal", function () {
						if($("#quickview-des__toggle").height() > 150){ 
							$("#quickview-des__toggle").addClass("opened"); 
							$(".quickview-des__trigger .btn-toggle").addClass("btn-viewmore").find("span").html("Xem thêm chi tiết sản phẩm +");
						}						
					});
				}
			})
		}
	},
	showQuickView: function(){
		jQuery(document).on("click", ".product-block .pro-btn-order", function(e){
			e.preventDefault();
			var prolink = jQuery(this).attr("data-link");
			var protitle = jQuery(this).parents(".product-block").find(".product-detail h3").text();
			history.pushState(window.location.href, protitle, prolink);
			$(".mainBody-theme").addClass("show-quickview");	
			$(".wrapper-quickview").addClass("show-quickview");
			$(".modal-detailProduct").removeClass("fixed_pro").html(""); 
			$(".modal-detailProduct--scroll").parent(".modal-detailProduct").find(".modal-detailProduct--scroll").css({ "height": "100%" });
			jQuery.ajax({ 
				url: prolink + "?view=quickview",	
				async: true,
				success:function(data){
					$(".paramlink-topbar").find(".purl-title span").html(protitle);
					setTimeout(function(){
						jQuery(".modal-detailProduct").html(data); 
						if($(".wrapper-quickview").hasClass("show-quickview")){
							if($("#quickview-des__toggle").height() > 150){ 
								$("#quickview-des__toggle").addClass("opened"); 
								$(".quickview-des__trigger .btn-toggle").addClass("btn-viewmore").find("span").html("Xem thêm chi tiết sản phẩm +");
							}		
						}
					},300);
				}
			});
			if($(".wrapper-quickview").hasClass("show-quickview")){
				$(".mainHeader").removeClass("hSticky-up");
			}
		});
		jQuery(document).on("click", ".product-block .product-img",function(e){
			e.preventDefault();
			var prolink = jQuery(this).attr("data-link");
			var protitle = jQuery(this).parents(".product-block").find(".product-detail h3").text();
			history.pushState(window.location.href, protitle, prolink);
			$(".mainBody-theme").addClass("show-quickview");	
			$(".wrapper-quickview").addClass("show-quickview");
			$(".modal-detailProduct").removeClass("fixed_pro").html(""); 
			$(".modal-detailProduct--scroll").parent(".modal-detailProduct").find(".modal-detailProduct--scroll").css({ "height": "100%" });
			jQuery.ajax({ 
				url: prolink + "?view=quickview",	
				async: true,
				success:function(data){
					$(".paramlink-topbar").find(".purl-title span").html(protitle);
					setTimeout(function(){
						jQuery(".modal-detailProduct").html(data); 
						if($(".wrapper-quickview").hasClass("show-quickview")){
							if($("#quickview-des__toggle").height() > 150){ 
								$("#quickview-des__toggle").addClass("opened"); 
								$(".quickview-des__trigger .btn-toggle").addClass("btn-viewmore").find("span").html("Xem thêm chi tiết sản phẩm +");
							}		
						}
					},300);
				}
			});
			if($(".wrapper-quickview").hasClass("show-quickview")){
				$(".mainHeader").removeClass("hSticky-up");
			}
		});
		jQuery(document).on("click", ".order-item .order-quickview",function(e){
			e.preventDefault();
			var prolink = jQuery(this).attr("data-link");
			var protitle = jQuery(this).parents(".product-block").find(".product-detail h3").text();
			history.pushState(window.location.href, protitle, prolink);
			$(".mainBody-theme").addClass("show-quickview");	
			$(".wrapper-quickview").addClass("show-quickview");
			$(".modal-detailProduct").removeClass("fixed_pro").html(""); 
			$(".modal-detailProduct--scroll").parent(".modal-detailProduct").find(".modal-detailProduct--scroll").css({ "height": "100%" });
			jQuery.ajax({ 
				url: prolink + "?view=quickview",	
				async: true,
				success:function(data){
					$(".paramlink-topbar").find(".purl-title span").html(protitle);
					setTimeout(function(){
						jQuery(".modal-detailProduct").html(data); 
						if($(".wrapper-quickview").hasClass("show-quickview")){
							if($("#quickview-des__toggle").height() > 150){ 
								$("#quickview-des__toggle").addClass("opened"); 
								$(".quickview-des__trigger .btn-toggle").addClass("btn-viewmore").find("span").html("Xem thêm chi tiết sản phẩm +");
							}		
						}
					},300);
				}
			});
			if($(".wrapper-quickview").hasClass("show-quickview")){
				$(".mainHeader").removeClass("hSticky-up");
			}
		});
		jQuery(window).on("popstate", function() {
			location.reload(true);
		});
		jQuery(document).on("click", ".quickview-close", function(e){
			history.pushState(window.location.href, proT , proL);
			jQuery(".wrapper-quickview").removeClass("show-quickview");
			jQuery(".mainBody-theme").removeClass("show-quickview");
		});
		if(jQuery(window).width() > 767) {
			jQuery(document).on("click", ".quickviewOverlay", function(e){
				history.pushState(window.location.href, proT , proL);
				jQuery(".wrapper-quickview").removeClass("show-quickview");
				jQuery(".mainBody-theme").removeClass("show-quickview");
			});
		} else { 
			$(document).on("click", ".product-sharing", function(){
				$(this).toggleClass("sharing-active");
			});	
			jQuery(document).on("click", ".product-block .product-name a", function(e){
				e.preventDefault();
				var prolink = jQuery(this).attr("data-link");
				var protitle = jQuery(this).parents(".product-block").find(".product-detail h3").text();
				history.pushState(window.location.href, protitle, prolink);
				$(".mainBody-theme").addClass("show-quickview");	
				$(".wrapper-quickview").addClass("show-quickview");
				$(".modal-detailProduct").removeClass("fixed_pro").html(""); 
				$(".modal-detailProduct--scroll").parent(".modal-detailProduct").find(".modal-detailProduct--scroll").css({ "height": "100%" });
				jQuery.ajax({ 
					url: prolink + "?view=quickview",	
					async: true,
					success:function(data){
						$(".paramlink-topbar").find(".purl-title span").html(protitle);
						setTimeout(function(){
							jQuery(".modal-detailProduct").html(data); 
							if($(".wrapper-quickview").hasClass("show-quickview")){
								if($("#quickview-des__toggle").height() > 150){ 
									$("#quickview-des__toggle").addClass("opened"); 
									$(".quickview-des__trigger .btn-toggle").addClass("btn-viewmore").find("span").html("Xem thêm chi tiết sản phẩm +");
								}		
							}
						},300);
					}
				});
				if($(".wrapper-quickview").hasClass("show-quickview")){
					$(".mainHeader").removeClass("hSticky-up");
				}
			});
		}
	},
	orderFunction: function(){
		function check_time(){
			var hstart = parseInt(19);
			var mstart = parseInt(45);
			var hend = parseInt(6);
			var check_time = new Date();
			var hours = check_time.getHours();
			var minute = check_time.getMinutes();
			if(hours == hstart){
				if(minute >= mstart ){
					$(".btn-check a").addClass("over-time").html("Đã ngưng nhận đơn hôm nay");
					$(".action-cart a").addClass("over-time");
				}
				else{
					$(".btn-check a").removeClass("over-time").html("Thanh toán");
					$(".action-cart a").removeClass("over-time");
				}
			}
			else{
				if (hours < hend || hours > hstart){
					$(".btn-check a").addClass("over-time").html("Đã ngưng nhận đơn hôm nay");
					$(".action-cart a").addClass("over-time");
				}
				else{
					$(".btn-check a").removeClass("over-time").html("Thanh toán");
					$(".action-cart a").removeClass("over-time");
				}
			}
			if($("#header-pick-time").length > 0){
				var text_delivery = parseInt($(".btn-choise-time").text());
				if(!isNaN(text_delivery)){
					$(".btn-check a").removeClass("over-time").html("Thanh toán");
					$(".action-cart a").removeClass("over-time");
				}
			}
		}
		check_time();
		$(".btn-choise-time").click(function(){
			$(this).parent().toggleClass("active");
		});
		var fix_d = new Date(), choise_day = "";
		var dayf = fix_d.getTime();
		var check_hours = fix_d.getHours();
		var one = dayf + 86400000;
		var two = dayf + (86400000*2);
		one = new Date(one);
		two = new Date(two);
		choise_day += "<option data-check="oke" value=""+ format_date(fix_d.getDate()) +"-"+ format_date(fix_d.getMonth() + 1) +"-"+ fix_d.getFullYear() +"" >Hôm nay</option>";
		choise_day += "<option data-check="" value=""+ format_date(one.getDate()) +"-"+ format_date(two.getMonth() + 1) +"-"+ fix_d.getFullYear() +"" >Ngày "+ format_date(one.getDate()) +"-"+ format_date(one.getMonth() + 1) +"</option>";
		choise_day += "<option data-check="" value=""+ format_date(one.getDate()) +"-"+ format_date(two.getMonth() + 1) +"-"+ fix_d.getFullYear() +"" >Ngày "+ format_date(two.getDate()) +"-"+ format_date(two.getMonth() + 1) +"</option>";
		$(".choise-day").html(choise_day);
		function format_date(num){
			if( num < 10 )
				return "0"+num;
			else
				return num;
		}
		$(".sub-choise-now").click(function(){
			var _this = $(this);
			var time = "Giao ngay";
			var timeText = "<span class="timebox"><span class="textday">Giao ngay</span></span><span class="btnchange">Thay đổi</span>";
			$(".btn-choise-time span").html(timeText);
			$.ajax({
				type: "POST",
				url: "/cart/update.js",
				data: "note=Giao ngay",
				dataType: "json",
				success: function(a) {
					_this.parents(".action-acc").toggleClass("active");
					_this.parents(".action-acc").find(".sub-choise").removeClass("active");
					check_time();
				},
			});
		});
		$(".sub-choise-time").click(function(){
			$(this).toggleClass("active");
			$(this).next().toggleClass("active");
		});
		$(".choise-day").change(function(){
			var check = $(this).find("option:checked").data("check");
			if(check == "oke"){
				$(".choise-time option").each(function(){
					var hourse = $(this).data("hours");
					if(hourse <= check_hours) $(this).attr("disabled","disabled").removeAttr("selected");
				});
				$(".choise-time option:not([disabled])").eq(0).trigger("click").attr("selected", true).prop("selected",true);
			}else{
				$(".choise-time option").removeAttr("disabled").removeAttr("selected");
				$(".choise-time option").eq(0).attr("selected", true).prop("selected",true);
			}
			if($(".choise-time option:not([disabled])").length == 0){
				$(".btn-choise-submit, .sub-choise-now").addClass("disabled");
			}else{
				$(".btn-choise-submit, .sub-choise-now").removeClass("disabled");
			}
			if(check_hours >= 20){
				$(".sub-choise-now").addClass("disabled");
			}else{
				$(".sub-choise-now").removeClass("disabled");
			}
		});
		$(".choise-day option:first-child").trigger("change");
		$(".btn-choise-submit").click(function(e){
			e.preventDefault();
			var time = $(".choise-day").val() + " " + $(".choise-time").val();
			var timeText = "<span class="timebox">Giao ngày: <span class="textday">" + $(".choise-day").val() + "</span> - Lúc: <span class="texttime">" + $(".choise-time").val() + "</span></span><span class="btnchange">Thay đổi</span>";
			$(".btn-choise-time span").html(timeText);
			var _this = $(this);
			$.ajax({
				type: "POST",
				url: "/cart/update.js",
				data: "note=" + time,
				dataType: "json",
				success: function(a) {
					_this.parents(".action-acc").toggleClass("active");
					_this.parents(".sub-choise").removeClass("active");
					check_time();
				},
			});
		});
		$(".cart-mobile").click(function(){
			if($(this).parent(".sticky-right").hasClass("active")){
				$(this).parent(".sticky-right").removeClass("active");
				$(this).find(".flex-box span").eq(2).html("Xem chi tiết");
				$("body").removeClass("cart-open");
			}else{
				$("body").addClass("cart-open");
				$(this).parent(".sticky-right").addClass("active");
				$(this).find(".flex-box span").eq(2).html("Đóng");
			}
		});
		$(".site-overlay").click(function(){
			$(".cart-mobile").parent(".sticky-right").removeClass("active");
			$(".cart-mobile").find(".flex-box span").eq(2).html("Xem chi tiết");
			$("body").removeClass("cart-open");
		});
		
		/*
		$(document).on("click",".product-block .pro-btn-order",function(e){
			e.preventDefault();
			var link = $(this).data("link");
			$.ajax({
				url:link +"?view=quickview",
				success:function(e){
					$("#quick-view-modal .modal-detailProduct").html(e);		
					$("#quick-view-modal").modal("show");
					$("#quick-view-modal").on("shown.bs.modal", function () {
						if($("#quickview-des__toggle").height() > 150){ 
							$("#quickview-des__toggle").addClass("opened"); 
							$(".quickview-des__trigger .btn-toggle").addClass("btn-viewmore").find("span").html("Xem thêm chi tiết sản phẩm +");
						}		
					});
				}
			})
		});
		$(document).on("click",".product-block .product-img",function(e){
			e.preventDefault();
			var link = $(this).data("link");
			$.ajax({
				url:link +"?view=quickview",
				success:function(e){
					$("#quick-view-modal").html(e);		
					$("#quick-view-modal").modal("show");
					$("#quick-view-modal").on("shown.bs.modal", function () {
						if($("#quickview-des__toggle").height() > 150){ 
							$("#quickview-des__toggle").addClass("opened"); 
							$(".quickview-des__trigger .btn-toggle").addClass("btn-viewmore").find("span").html("Xem thêm chi tiết sản phẩm +");
						}		
					});
				}
			})
		});
		$(document).on("click",".order-item .order-quickview",function(e){
			e.preventDefault();
			var link = $(this).data("link");
			$.ajax({
				url:link +"?view=quickview",
				success:function(e){
					$("#quick-view-modal").html(e);		
					$("#quick-view-modal").modal("show");
					$("#quick-view-modal").on("shown.bs.modal", function () {
						if($("#quickview-des__toggle").height() > 150){ 
							$("#quickview-des__toggle").addClass("opened"); 
							$(".quickview-des__trigger .btn-toggle").addClass("btn-viewmore").find("span").html("Xem thêm chi tiết sản phẩm +");
						}		
					});
				}
			})
		});
		*/
		
		$("#quick-view-modal").on("show.bs.modal", function () {
			$(".cart-mobile").parent(".sticky-right").addClass("modal-quickview-show")
		});
		$("#quick-view-modal").on("hide.bs.modal", function() {
			$(".cart-mobile").parent(".sticky-right").removeClass("modal-quickview-show")
		});
		$(".orders-cart").on("click",".cart-item-remove",function(e){
			e.preventDefault();
			var id = $(this).data("id");
			$.ajax({
				type:"POST",
				url: "/cart/change.js",
				data: "quantity=0&id=" + id,
				success: function(datas){
					$.ajax({
						type:"GET",
						url: "/cart?view=update",
						success: function(data){
							$(".orders-cart--ajax-here").html(data);
						}
					});
					CR.Main.getModalCart(false);
					$.getJSON("/cart.js", function(data){
						if (data.item_count == 0){
							$(".btn-check a").addClass("disabled");
						}else{
							$(".btn-check a").removeClass("disabled");
						}
						$(".count-holder").html(data.item_count);
						$(".cart-count .total-price").html(Haravan.formatMoney(data.total_price, formatMoney));
						if($(".sticky-right").hasClass("active")){
							$(".cart-mobile .flex-box").html("<span>"+data.items.length+" Món</span>" + Haravan.formatMoney(data.total_price, formatMoney) + "</span><span>Đóng</span>");
						}else{
							$(".cart-mobile .flex-box").html("<span>"+data.items.length+" Món</span>" + Haravan.formatMoney(data.total_price, formatMoney) + "</span><span>Xem chi tiết</span>");
						}
					});
				}
			});
		});
		$(".orders-cart").on("click",".btn-plus", function(e){
			e.preventDefault();
			var val = parseInt($(this).parent().find("input").val());
			var id = $(this).parents(".select-quantity").data("id");
			if ( val != undefined ) {
				$(this).prev().val(val + 1);
				$(this).parent().find(".btn-sub").removeClass("disabled");
				update_cart(id,val+1);
			}else {
				console.log("error: Not see elemnt " + jQuery("input[name="quantity"]").val());
			}
			var $input = $(this).parent().find("input[name="quantity"]").eq(0);
			if($input.attr("data-limit") == "" || $input.attr("data-limit") == null)
				return false;
			var qty = $input.val(), limit = parseInt($input.attr("data-limit"));
			if(isNaN(limit))
				return false;
			if(qty > limit){
				$input.val(limit);
			}
		});
		$(".orders-cart").on("click",".btn-sub", function(e){
			e.preventDefault();
			var val = parseInt($(this).parent().find("input").val());
			var id = $(this).parents(".select-quantity").data("id");
			if ( val != undefined ) {
				if (val > 1) {
					$(this).next().val(val - 1);
					if(val == 2) $(this).addClass("disabled");
				}
				var math = val - 1;
				if (math == 0){
					$(this).parents(".cart-item").find(".cart-item-remove").click();
				}else{
					update_cart(id,val-1);
				}
			}else {
				console.log("error: Not see elemnt " + jQuery("input[name="quantity"]").val());
			}
			var $input = $(this).parent().find("input[name="quantity"]").eq(0);
			if($input.attr("data-limit") == "" || $input.attr("data-limit") == null)
				return false;
			var qty = $input.val(), limit = parseInt($input.attr("data-limit"));
			if(isNaN(limit))
				return false;
			if(qty > limit){
				$input.val(limit);
			}
		});
		function update_cart(id,quantity){
			var line = {line: id, quantity: quantity};
			$.ajax({
				type:"POST",
				url: "/cart/change.js",
				data: line,
				dataType: "json",
				success: function(datas){
					CR.Main.getModalCart(false);
					//$(".count-holder").html(datas.item_count);
					$(".cart-count .total-price").html(Haravan.formatMoney(datas.total_price, formatMoney));
					$(".orders-cart .orders-cart-bottom .subtotal .orders-total").html(Haravan.formatMoney(datas.total_price, formatMoney));
					$(".orders-cart .orders-cart-bottom .tax .orders-total").html(Haravan.formatMoney(datas.total_price, formatMoney));
					$(".orders-cart .orders-cart-bottom .amount .orders-total").html(Haravan.formatMoney(datas.total_price, formatMoney));
					if($(".sticky-right").hasClass("active")){
						$(".cart-mobile .flex-box").html("<span>"+datas.items.length+" Món</span>" + Haravan.formatMoney(datas.total_price, formatMoney) + "</span><span>Đóng</span>");
					}
					else{
						$(".cart-mobile .flex-box").html("<span>"+datas.items.length+" Món</span>" + Haravan.formatMoney(datas.total_price, formatMoney) + "</span><span>Xem chi tiết</span>");
					}
					for(i = 0;i< datas.items.length;i++){
						var id = datas.items[i].variant_id;
						var price = Haravan.formatMoney(datas.items[i].line_price, formatMoney);
						$(".orders-cart .cart-item[data-id=""+id+""] .quantity-selector").val(datas.items[i].quantity);
						$(".orders-cart .cart-item[data-id=""+id+""] .cart-item-price span").html(price);
					}
				}
			});
		}
		$(".sticky-right").click(function(e){
			var target = e.target;
			if (!$(target).closest(".cart-mobile").length && !$(target).closest(".orders-cart").length ) {
				$(".sticky-right").removeClass("active");
				$("body").removeClass("cart-open");
				$(".cart-mobile .flex-box span").eq(2).html("Xem chi tiết");
			}
		});
		
		$("#quick-view-modal").on("click",".product-title img",function(){
			var item = $("#quick-view-modal .list-img").html();
			if($(".slider-img .product-img-owl").hasClass("owl-loaded")){
				$(".slider-img .product-img-owl").html("").owlCarousel("destroy");
			}
			$(".slider-img .product-img-owl").html(item).owlCarousel({
				items:1,
				nav: false,
				dots: true,
				loop:false
			});
			$(".slider-img").removeClass("hide");
		});
		
		var lastId,
				topMenu = $(".orders-cate ul"),
				menuItems = topMenu.find("a"),
				scrollItems = menuItems.map(function () {
					if (0 === $(this).attr("href").indexOf("#")) {
						var e = $($(this).attr("href"));
						if (e.length) return e;
					}
				});
		
		$(window).scroll(function () {
			if (($(".main-header").length > 0 && $(window).scrollTop() > 0 ? $(".main-header").addClass("fixed") : $(".main-header").removeClass("fixed"), $(window).width() < 768)) {
				$(window).scrollTop() > 0 ? $(".orders-cate").addClass("top") : $(".orders-cate").removeClass("top");
				var e = 0,
						t = !0;
				if (
					($(".orders-cate li").each(function () {
						t && (e += $(this).outerWidth()), $(this).hasClass("active") && (t = !1);
					}),
					 e > $(window).width() && $(".orders-cate li.active").length > 0)
				) {
					var a = e - $(window).width() + 20;
					$(".orders-cate ul").css("transform", "translateX(-" + a + "px)");
				} else $(".orders-cate ul").css("transform", "translateX(0)");
			}
			var i = $(this).scrollTop() + 80,
					n = scrollItems.map(function () {
						if ($(this).offset().top < i) return this;
					}),
					s = (n = n[n.length - 1]) && n.length ? n[0].id : "";
			lastId !== s &&
				((lastId = s),
				 $(".orders-block").removeClass("active") && $("#"+lastId).addClass("active"),
				 menuItems
				 .parent()
				 .removeClass("active")
				 .end()
				 .filter("[href="#" + s + ""]")
				 .parent()
				 .addClass("active"));
		});
		$(".orders-cate ul li a").click(function (e) {
			e.preventDefault();
			var t = $(this).attr("href"),
					a = $(t).offset().top - 70;
			$(window).width() < 768 && (a = $(t).offset().top - 75), $("body,html").animate({ scrollTop: a + "px" }, 500);
		});
		var slug = function (e) {
			return (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.toLowerCase()).replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")).replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")).replace(/ì|í|ị|ỉ|ĩ/g, "i")).replace(
				/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
				"o"
			)).replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")).replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")).replace(/đ/g, "d")).replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\"| |\"|\&|\#|\[|\]|~|$|_/g, "-")).replace(/-+-/g, "-")).replace(/^\-+|\-+$/g, ""));
		}
		var $filter = $(".search-product input[type="text"]");
		$filter.bind("keyup change paste propertychange", function () {
			var e = $(this).val();
			e.length > 0
				? ((e = slug(e)),
					 $(this).attr("data-history", e),
					 $(".orders-cate li").removeClass("active"),
					 $(".orders-block, .order-item li").addClass("hidden"),
					 $(".orders-block").each(function () {
				var t = $(this);
				t.find(".order-item li").each(function () {
					-1 != $(this).data("value").indexOf(e) && ($(this).removeClass("hidden"), t.removeClass("hidden"));
				});
			}))
			: $(".orders-block, .order-item li").removeClass("hidden");
		});
	},
	smoothScroll: function(){
		if (window.location.hash != ""){
			var target = window.location.hash;
			$("html, body").stop().animate({
				"scrollTop": $(target).offset().top - 40
			}, 900, "swing", function () {});
		}
		
		$("a[href^="#"]").bind("click.smoothscroll",function(e){
			e.preventDefault();
			var target = this.hash,
					$target = $(target);
			$("html, body").stop().animate( {
				"scrollTop": $target.offset().top - 40
			}, 2000, "swing", function () {});
		});
		
	}
}
CR.Index = {
	init: function(){
		this.sliderHome();
		this.tablistHome();
		this.loadMoreStyle1();
		this.loadMoreStyle2();
		this.sidebarCart();
	},
	sliderHome: function(){
		$("#home-slider .owl-carousel").owlCarousel({
			items:1,
			nav: true,
			navText: [
				"<i class="fa fa-arrow-left"></i>",
				"<i class="fa fa-arrow-right"></i>",
			],
			dots: false,		
			touchDrag: true,
			lazyLoad:true,	
			autoplay:true,autoplayTimeout:8000,smartSpeed:800,
			loop: true
		});
	},
	tablistHome: function(){
		$(document).on("click", ".home-tablist--nav ul li a", function(){
			$(".home-tablist--nav ul li").removeClass("active");
			$(".home-tablist--tab .ajax-here").removeClass("active");
			var handle = $(this).attr("data-handle");
			var index = $(this).parent().index();
			$(this).parents("li").addClass("active");
			$(".home-tablist--tab .ajax-here:eq("+index+")").addClass("active");
			var sizeContent = $(".home-tablist--tab .ajax-here:eq("+index+") > div").length;
			if (sizeContent == 0){
				$.ajax({
					url: handle + "?view=ajax-home",
					success: function(data){
						$(".home-tablist--tab .ajax-here:eq("+index+")").html(data);
					},
				});
			}else{

			}
		});
	},
	loadMoreStyle1: function(){
		var count_product = function(that,total,cur_page){
			if(cur_page > total){
				that.hide();
			} 
			else {
				that.show();
			}
		}
		jQuery(document).on("click",".home-tablist--col.style-1 .viewall-collection button", function(e){
			var a = $(".home-tablist--nav li.active a"),
					ahide = $(this).parent(),
					aim = $(".home-tablist--tab .ajax-here.active");
			var that = $(this);
			var cur_page = parseInt($(this).attr("data-page"));
			var total_num = $(this).attr("data-total"); // Số lượng sản phẩm của nhóm
			var urlQuery =  $(this).attr("data-handle");

			if($(this).hasClass("viewmore-search")){
				urlQuery = "/search?q="+urlQuery;
			}
			
			if(total_num == "null" || total_num == "" || total_num == undefined){
				jQuery.ajax({
					type: "GET",
					url:  urlQuery + (urlQuery.indexOf("?") > -1 ? "&view=index-pagesize" : "/?view=index-pagesize"),
					async: false,
					success:function(total){
						total_num = total;
						that.attr("data-total",total);
					}
				});
			}
			else{
				total_num = parseInt(total_num);
			}

			if(cur_page <= total_num){
				jQuery.ajax({
					type: "GET",
					url: urlQuery + (urlQuery.indexOf("?") > -1 ? "&view=index-data" : "/?view=index-data") + "&page=" + cur_page,
					success:function(data){
						cur_page++;
						that.attr("data-page",cur_page);
						ahide.parents(".ajax-here.active").find(".content-product-list").append(data);
						count_product(ahide,total_num,cur_page);
					}
				});
			}
		})
	},
	loadMoreStyle2: function(){
		
		jQuery(document).on("click",".home-tablist--col.style-2 .orders-block.active button.viewmore", function(e){
			var cur_page = Number($(this).attr("data-page")),
					total_page = $(this).attr("data-total"),
					urlQuery = $(this).attr("data-handle");
			
			if(total_page == "null"){
				jQuery.ajax({
					type: "GET",
					url:  urlQuery +"/?view=index2-pagesize",
					async: false,
					success:function(total){
						total_page = Number(total);
						$(".orders-block.active button.viewmore").attr("data-total",total_page);
					}
				});
			}
			else{
				total_page = Number(total_page);
			}
			
			if(cur_page <= total_page){
				jQuery.ajax({
				type: "GET",
				url: urlQuery + "/?view=index2-data&page=" + cur_page,
				success:function(data){
					cur_page ++;
					$(".orders-block.active button.viewmore").attr("data-page",cur_page);
					$(".orders-block.active .order-item").append(data);
					if(cur_page > total_page){
						 $(".orders-block.active .viewall-collection").hide();
					}
				}
			});
			}
		})
	},
	sidebarCart: function(){
		$.ajax({
			type:"GET",
			url: "/cart?view=update",
			success: function(data){
				$(".orders-cart--ajax-here").html(data);
			}
		});
		CR.Main.getModalCart(false);
	}
}
CR.Cart = {
	init: function(){}
}

