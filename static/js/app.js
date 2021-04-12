//Initiliaize collection of belly button IDs into dropdown and create event listeners
function init(){
    //Use d3 to create an event handler of the drop down
    var dropDown = d3.select("#selDataset");

    //Fetch the JSON data
    d3.json("data/samples.json").then((data) => {

        //Append all IDs to the drop down
        var names = data.names;
        names.forEach((id) => {
            dropDown.append("option")
            .text(id);
        });

        //Promise pending
        //const dataPromise = names[0];

        //Build the plot with the selected data

        //Add event listener for drop down
        dropDown.on("change",metaData); //metaData function below
    });
};

init();

function metaData(){
    //Use d3 to create an event handler of the drop down
    var dropDown = d3.select("#selDataset").property("value");

    //console.log(dropDown);

    //Create a custom filtering function
    function dataFilter(metaData) {
        return metaData.id == dropDown
    };

    //Fetch the JSON data
    d3.json("data/samples.json").then((data) => {
        
        var metaData = data.metadata;

        var dataFiltered = metaData.filter(dataFilter);

        // Use indexing to access an array item
        var dataFiltered = dataFiltered[0];

        console.log(dataFiltered);

        // //Clears the table of the original data & appends relative selected data
        // Select the html tag where the data is being placed into
        panelBody = d3.select(".panel-body");    

        // Clear the info withinin the selected panel-body HTML tag
        panelBody.html("");
        //Appends data
        
        panelBody.append("h5").text("ID: " + dataFiltered.id);
        panelBody.append("h5").text("Ethnicity: " + dataFiltered.ethnicity);
        panelBody.append("h5").text("Gender: " + dataFiltered.gender);
        panelBody.append("h5").text("Age: " + dataFiltered.age);
        panelBody.append("h5").text("Location: " + dataFiltered.location);
        panelBody.append("h5").text("Blood Type: " + dataFiltered.bbtype);
        panelBody.append("h5").text("Washing Freq: " + dataFiltered.wfreq);
    });

    // // //

    // //Fetch the JSON data
    // d3.json("data/samples.json").then((data) => {
        
    //     var samples = data.samples;
    
    //     var dataFiltered = samples.filter(xxx);
    
    //     // Use indexing to access an array item
    //     var dataFiltered = dataFiltered[0];
    
    //     console.log(dataFiltered);
    
    //     // //Clears the table of the original data & appends relative selected data
    //     // Select the html tag where the data is being placed into
    //     panelBody = d3.select(".panel-body");    
    


    // var trace1 = {
    //     x: ["beer", "wine", "martini", "margarita",
    //       "ice tea", "rum & coke", "mai tai", "gin & tonic"],
    //     y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
    //     type: "bar"
    //   };
      
    //   var data = [trace1];
      
    //   var layout = {
    //     title: "'Bar' Chart"
    //   };
      
    //   Plotly.newPlot("plot", data, layout);

};
