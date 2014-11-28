
// Item 
var Item = React.createClass({
  removeItem: function(event){
    event.preventDefault();

    // Suppression de la star
    var keyToSlice = this.refs.delete.props.thekey;
    app.data.splice(keyToSlice, 1);

    // Rerender
    app.renderItems(app.data);

  },
  render: function() {
    return (
      <div className="line">
        <h2>
          {this.props.name}
        </h2>
        <span className="text">{this.props.text}</span>
        <br />
        <button type="button" ref="delete" className="killme" thekey={this.props.thekey} onClick={this.removeItem}>Kill me</button>
      </div>
    );
  }
});

// Liste items
var ItemList = React.createClass({
  render: function() {
    var key = 0;
    var itemNodes = this.props.data.map(function (item) {
      key++;
      return (
        <Item name={item.name} text={item.text} thekey={key-1}></Item>
      );
    });
    return (
      <div>
        {itemNodes}
        <AddForm />
      </div>
    );
  }
});

// Formulaire d'ajout 
var AddForm = React.createClass({
  handleSubmit: function(event){
    event.preventDefault();

    // Récupération des valeurs du formulaire
    var name    = this.refs.name.getDOMNode().value.trim(), 
        text    = this.refs.text.getDOMNode().value.trim(), 
        newname = {name : name, text : text}

    // On réinitialise la valeur des champs
    this.refs.name.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';

    // Update data
    app.data.push(newname);
    app.renderItems(app.data);
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="name" placeholder="Nom" required="true" />
        <input type="text" ref="text" placeholder="slogan" required="true" />
        <button type="submit" className="submit">Add</button>
      </form>
    );
  }
})

var app = {
  data : [
    {name: "Steven Seagal", text: "Always happy"},
    {name: "Chuck Norris", text: "Father of god."},
    {name: "JCVD", text: 'Aware'}
  ], 

  renderItems : function(message){
    React.renderComponent(
      <ItemList data={message}/>, document.getElementById('content')
    );
  }
}

app.renderItems(app.data);

// Real time events
var pusher = new Pusher('your-pusher-key');
var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
	data = eval('(' + data + ')');
  app.data.push(data);
  app.renderItems(app.data);
});