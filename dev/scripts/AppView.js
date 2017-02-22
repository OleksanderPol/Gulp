function AppView(id){
  this.el = $('#'+id);
  this.el.html( new BookView().el );
  console.log('In debugger we trust. c !== с');
}
