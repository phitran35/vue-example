/* eslint-disable */
"use strict";
export var vueNodeTemplateHtml = "<li role=\"treeitem\" :class=\"nodeClassName\" :id=\"id\"><i class=\"tree-icon tree-ocl\" role=\"presentation\" @click=\"ontoggle()\"></i><div :class=\"anchorClassName\" href=\"javascript:void(0)\" :draggable=\"draggable\" @mouseenter=\"hover(true)\" @mouseleave=\"hover(false)\" @contextmenu=\"oncontextmenu($event)\" :data-path=\"pathString\"><div class=\"tree-icon-wrapper\"><div><i v-if=\"checkbox\" :class=\"checkboxClassName\" role=\"presentation\"></i><i v-if=\"data.icon !== false\" :class=\"iconClassName\" role=\"presentation\" @click=\"ontoggle()\"></i><component v-if=\"data.component\" :is=\"data.component\" :data=\"data\"></component><template v-else>{{data.text}}<template v-if=\"data.showQuestionButton\"><span class=\"question-wrapper\">Question Id: {{data.id}}</span></template></template><span v-if=\"hasMarker\" :class=\"markerClassName\">&#160;</span><div v-if=\"data.contextmenu && contextmenuVisible\" :style=\"contextmenuStyle\"><component :is=\"data.contextmenu\" :data=\"contextmenuData\"></component></div></div><div><div class=\"survey-groups view-survey-button\" v-if=\"data.showSurveyButton\" @click=\"onViewSurvey(data)\">View Survey</div><div class=\"survey-groups view-question-button\" v-if=\"data.showQuestionsButton\" @click=\"onViewQuestions(data)\">View Questions</div><div class=\"survey-groups view-question-button\" v-if=\"data.showQuestionButton\" @click=\"onViewQuestion(data)\">View Question</div><div class=\"survey-groups approval-button\" v-if=\"data.showApprovalButton\" @click=\"onSendApproval(data)\">Send for Approval</div><template v-if=\"data.badgeLength && data.badgeLength > 0\"><div class=\"survey-groups bagde-items\" v-if=\"data.showBadgeItems\">{{data.badgeLength}}</div></template><template v-else><div class=\"survey-groups bagde-items\" v-if=\"data.showBadgeItems\">{{data.children ? data.children.length : 0}}</div></template></div></div></div><ul v-if=\"data.children\" role=\"group\" class=\"tree-children\"><node v-for=\"(child, i) in data.children\" :key=\"i\" :data=\"child\" :last=\"i === data.children.length - 1\" :checkbox=\"checkbox\" :path=\"geChildPath(i)\" :draggable=\"draggable\" :root=\"root\" :zindex=\"zindex\" :preid=\"preid\" @toggle=\"ontoggle($event)\" @change=\"onchange($event)\"></node></ul></li>";
export var vueTreeTemplateHtml = "<div :class=\"rootClassName\" role=\"tree\"><ul :class=\"containerClassName\" role=\"group\" @dragstart=\"ondragstart($event)\" @dragend=\"ondragend($event)\" @dragover=\"ondragover($event)\" @dragenter=\"ondragenter($event)\" @dragleave=\"ondragleave($event)\" @drop=\"ondrop($event)\"><node v-for=\"(child, i) in data\" :key=\"i\" :data=\"child\" :last=\"i === data.length - 1\" :checkbox=\"checkbox\" :path=\"[i]\" :draggable=\"draggable\" :root=\"data\" :zindex=\"zindex\" :preid=\"preid\" @toggle=\"ontoggle($event)\" @change=\"onchange($event)\"></node></ul></div>";
