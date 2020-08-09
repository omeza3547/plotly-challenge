function getPlots(id) {
    //read in json data
    d3.json("samples.json").then(sampledata => {

        console.log(sampledata)

        let ids = sampledata.samples[0].otu_ids;
        console.log(ids)

        let sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        
        let labels1 = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(labels1)
   
        let OTU_top = (sampledata.samples[0].otu_ids.slice(0,10)).reverse();
    
        let OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU_ids: ${OTU_id}`)
   
        let labels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)

        let trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'blue'},
            type: "bar",
            orientation: "h",
        };
        
        let data = [trace];

        let layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode: "linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30 
            }
        };
        //create bar plot
    Plotly.newPlot("bar", data, layout);
       
        let trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text: sampledata.samples[0].otu_labels
        };

        let layout1 = {
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1000
        };

        let data1 = [trace1];
    //create bubble plot
    Plotly.newPlot("bubble", data1, layout1);
    });
}

//function to retrieve data and read json file
function getDemoInfo(id) {
    d3.json("samples.json").then( d => {
        let metadata = d.metadata;
        console.log(metadata)
        
        let result = metadata.filter(meta => meta.id.toString() === id)[0];

        let demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");

        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

// create function for change event
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
    getGauge(id);
}

// create function for the initial data rendering
function init() {
    let dropdown = d3.select("#selDataset");
    //read the data
    d3.json("samples.json").then( d => {
        console.log(d)
        //get id data to dropdown menu
        d.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        
        getPlots(d.names[0]);
        getDemoInfo(d.names[0]);
        getGauge(d.names[0]);
    });
}

init();