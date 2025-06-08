/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
Drupal.AjaxCommands.prototype.tabledragChanged=function(ajax,response,status,){if(status!=='success'){return}
const tableDrag=Drupal.tableDrag[response.tabledrag_instance];const rowObject=new tableDrag.row(document.getElementById(response.id),'',tableDrag.indentEnabled,tableDrag.maxDepth,!0,);rowObject.markChanged();rowObject.addChangedWarning()};
