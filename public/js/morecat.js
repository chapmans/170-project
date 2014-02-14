(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['morecat'] = template({"1":function(depth0,helpers,partials,data) {
  return "\r\n						Accepts credit cards\r\n					";
  },"3":function(depth0,helpers,partials,data) {
  return "\r\n						Cash only\r\n					";
  },"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data,depth1) {
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression, buffer = "<li class=\"place\">\r\n			<div class=\"name\">\r\n				<a class=\"next\" href=\"/places/"
    + escapeExpression(((stack1 = (depth1 && depth1.category)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((helper = helpers.index || (depth0 && depth0.index)),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "\">GO</a>\r\n				<a class=\"open-down icon-uniF48B\"></a>\r\n				<div class=\"title\">"
    + escapeExpression(((helper = helpers.place || (depth0 && depth0.place)),(typeof helper === functionType ? helper.call(depth0, {"name":"place","hash":{},"data":data}) : helper)))
    + "</div>\r\n				<div class=\"info\">"
    + escapeExpression(((helper = helpers.direction || (depth0 && depth0.direction)),(typeof helper === functionType ? helper.call(depth0, {"name":"direction","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = helpers.distance || (depth0 && depth0.distance)),(typeof helper === functionType ? helper.call(depth0, {"name":"distance","hash":{},"data":data}) : helper)))
    + " mi</div>\r\n			</div>\r\n			<div class=\"more-info\">\r\n				<div class=\"rating\"><span class=\"icon-star\"></span><span class=\"icon-star\"></span><span class=\"icon-star\"></span><span class=\"icon-star\"></span><span class=\"icon-star-half\"></span></div>\r\n				<div class=\"hours\">Todays hours: "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.hours)),stack1 == null || stack1 === false ? stack1 : stack1.friday)),stack1 == null || stack1 === false ? stack1 : stack1['0'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.hours)),stack1 == null || stack1 === false ? stack1 : stack1.friday)),stack1 == null || stack1 === false ? stack1 : stack1['1'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n				<div class=\"site\"><a href=\""
    + escapeExpression(((helper = helpers.site || (depth0 && depth0.site)),(typeof helper === functionType ? helper.call(depth0, {"name":"site","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = helpers.site || (depth0 && depth0.site)),(typeof helper === functionType ? helper.call(depth0, {"name":"site","hash":{},"data":data}) : helper)))
    + "</a></div>\r\n				<div class=\"payment\">\r\n					";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.payment), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\r\n				</div>\r\n			</div>\r\n		</li>";
},"useData":true});
})();