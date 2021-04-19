//Initiliaize collection of belly button IDs into dropdown and create event listener
function init() {
    //Use d3 to create an event handler of the drop down
    var dropDown = d3.select("#selDataset");

    //Fetch the JSON data
    d3.json("data/samples.json").then((data) => {

        //Append all IDs (data.names) to the drop down
        var names = data.names;
        names.forEach((id) => {
            dropDown.append("option")
            .text(id);
        });

        //Add event listener for drop down
        dropDown.on("change", metaData); //metaData function below
    });
};

init();

// // metaData 

function metaData(){
    //Use d3 to create an event handler of the drop down
    var dropDown = d3.select("#selDataset").property("value");

    //console.log(dropDown);

    //Create a custom filtering function for metadata.id (from samples.json data file)
    function dataFilter(metaData) {
        return metaData.id == dropDown
    };

    //Create a custom filtering function for samples.id (from samples.json data file)
    function dataFilteredsamplesID(samples) {
        return samples.id == dropDown
    };

    //Fetch the JSON data
    d3.json("data/samples.json").then((data) => {
        
        // Save the metadata in data as a variable
        var metaData = data.metadata;
        // Use filter to produce an array item of 1 object filtered by the dataFilter function
        var dataFiltered = metaData.filter(dataFilter);
        // Use indexing to access the 1 object in the array item
        var dataFiltered = dataFiltered[0];

        //console.log(dataFiltered);

        // Save the samples in data as a variable
        var samples = data.samples;
        // Use filter to produce an array item of 1 object filtered by the dataFilteredsamplesID function
        var samplesID = samples.filter(dataFilteredsamplesID);
        //console.log(samplesID);
        // Use indexing to access the 1 object in the array item
        var samplesID = samplesID[0];

        //console.log(samplesID);

        // Pull out arrays and save them as variables
        var otu_ids = samplesID.otu_ids;
        var otu_labels = samplesID.otu_labels;
        var sampleValues = samplesID.sample_values;

        //console.log(otu_ids)

        // // Prepare data for plotting

        // Slice the first 10 objects in the otu_ids array for plotting
        slicedData_otu = otu_ids.slice(0, 10);
        // Reverse the order of the list
        slicedData_otu = slicedData_otu.reverse();
        // Use map to create an array of texts to use in the y axis of the h-bar chart
        slicedData_otu = slicedData_otu.map(otu => "OTU " + otu + " ");        

        //console.log(slicedData_otu);

        // Slice the first 10 objects in the sampleValues array for plotting
        slicedData_values = sampleValues.slice(0, 10);
        slicedData_values = slicedData_values.reverse();

        //console.log(slicedData_values);

        // // Plot Charts
        
        // // Horizontal Bar Chart

        var trace1 = {
            x: slicedData_values,
            y: slicedData_otu,
            type: "bar",
            orientation: "h"
          };
        
        var data = [trace1];
    
        var layout = {
        title: "Top 10 OTUs present in Sample ID"
        };
    
        Plotly.newPlot("bar", data, layout);

        // // Bubble Chart
        // // https://plotly.com/javascript/bubble-charts/

        var trace1 = {
            x: otu_ids,
            y: sampleValues,
            mode: 'markers',
            marker: {
              color: otu_ids,
              size: sampleValues
            },
            text: otu_labels
          };
          
        var data = [trace1];
          
        var layout = {
            title: "Operational Taxonomic Unit (OTU) ID",
            showlegend: false
        };
          
        Plotly.newPlot("bubble", data, layout);

        // // Demographic Info Panel

        // Clears the table of the original data & appends relative selected data
        panelBody = d3.select(".panel-body");   // Select the html tag where the data is being placed into

        // Clear the info withinin the selected panel-body HTML tag
        panelBody.html("");
        
        //Appends data to panel
        panelBody.append("h5").text("ID: " + dataFiltered.id);
        panelBody.append("h5").text("Ethnicity: " + dataFiltered.ethnicity);
        panelBody.append("h5").text("Gender: " + dataFiltered.gender);
        panelBody.append("h5").text("Age: " + dataFiltered.age);
        panelBody.append("h5").text("Location: " + dataFiltered.location);
        panelBody.append("h5").text("Blood Type: " + dataFiltered.bbtype);
        panelBody.append("h5").text("Washing Freq: " + dataFiltered.wfreq);
    });
};
