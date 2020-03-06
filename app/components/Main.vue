<template>
  <Page class="page">
    <ActionBar title="Todo app" class="action-bar" />

    <TabView height="100%" androidTabsPosition="bottom" selectedTabTextColor="#53ba82" tabTextFontSize="15">
      
      <TabViewItem title="To Do" textTransform="uppercase">
        <!-- Positions an input field, a button, and the list of tasks in a vertical stack. -->
        <StackLayout orientation="vertical" width="100%" height="100%">
            <GridLayout columns="*,*" rows="*" width="50%" height="15%">
                <Image src="~/assets/photo.png" col="0" row="0" width="100px" height="100px" @tap="takePicture"/>
                <Image src="~/assets/image.png" col="1" row="0" width="100px" height="100px" @tap="uploadPicture"/>
            </GridLayout>


          <GridLayout columns="2*,*" rows="*" width="100%" height="25%">
            <TextField col="0" row="0" v-model="textFieldValue" hint="Nouvelle tâche..." editable="true" @returnPress="onButtonTap" />
            <!-- Configures the text field and ensures that pressing Return on the keyboard produces the same result as tapping the button. -->
            <Button col="1" row="0" text="Ajouter tâche" @tap="onButtonTap" />
          </GridLayout>

          <ListView class="list-group" for="todo in todos" @itemTap="onItemTap" style="height:75%" separatorColor="transparent" >
            <v-template>
              <Label id="active-task" :text="todo.name" class="list-group-item-heading" textWrap="true" />
            </v-template>
          </ListView>
          <ListView class="list-group" for="img in images" @itemTap="onItemTap" style="height:75%" separatorColor="transparent" >
            <v-template>
              <Image id="active-task" src="img" class="list-group-item-heading" textWrap="true" />
            </v-template>
          </ListView>
        </StackLayout>
      </TabViewItem>

      <TabViewItem title="Completé" textTransform="uppercase">
        <ListView class="list-group" for="done in dones" @itemTap="onDoneTap" style="height:75%" separatorColor="transparent">
          <v-template>
            <Label id="completed-task" :text="done.name" class="list-group-item-heading" textWrap="true" />
          </v-template>
        </ListView>
      </TabViewItem>

    </TabView>
  </Page>
</template>

<script>
import * as camera from "nativescript-camera";
import * as imagepicker from "nativescript-imagepicker";

import { Image } from "tns-core-modules/ui/image";

export default {


  methods: {
    onItemTap: function(args) {
     action('Qu\'est ce que vous voulez faire avec cette tâche ? ', 'Cancel', ['Completé', 'Effacer']) 
      .then(result => { 
        console.log(result); // Logs the selected option for debugging.
        switch (result) {
          case 'Completé': 
            this.dones.unshift(args.item); // Places the tapped active task at the top of the completed tasks.
            this.todos.splice(args.index, 1); // Removes the tapped active  task.
            break;
          case 'Effacer':
            this.todos.splice(args.index, 1); // Removes the tapped active task.
            break; 
          case 'Cancel' || undefined: // Dismisses the dialog
            break; 
        }
      })
    },

   onDoneTap: function(args) { 
    action('Qu\'est ce que vous voulez faire avec cette tâche ? ', 'Cancel', ['Marquer comme non completé', 'Effacer']) 
      .then(result => { 
        console.log(result); // Logs the selected option for debugging. 
        switch (result) { 
          case 'Marquer comme non completé':
            this.todos.unshift(args.item); // Places the tapped completed task at the top of the to do tasks. 
            this.dones.splice(args.index,1); // Removes the tapped completed task. 
            break; 
          case 'Effacer': 
            this.dones.splice(args.index, 1); // Removes the tapped completed task. 
            break; 
          case 'Cancel' || undefined: // Dismisses the dialog 
            break; 
        } 
      }) 
    },

    onButtonTap() {
      if (this.textFieldValue === "") return; // Prevents users from entering an empty string.
      console.log("Nouvelle tâche ajoutée: " + this.textFieldValue + "."); // Logs the newly added task in the console for debugging.
      this.todos.unshift({
        name: this.textFieldValue
      }); // Adds tasks in the ToDo array. Newly added tasks are immediately shown on the screen.
      this.textFieldValue = ""; // Clears the text field so that users can start adding new tasks immediately.
    },

    takePicture() {
        //Permissions
        const camera = require("nativescript-camera"); // Requiring the plugin module 
        camera.requestPermissions();

        // Or import only a specific class/method/property  of the plugin
        const requestPermissions = require("nativescript-camera").requestPermissions; // Requiring the needed code
        requestPermissions();

        //Var camera
        var imageModule = require("tns-core-modules/ui/image");

        //Options d'image
        var options = { width: 300, height: 300, keepAspectRatio: false, saveToGallery: true };

        
        camera.takePicture(options)   
        .then(function (imageAsset) {
            console.log("Result is an image asset instance");
            var image = new imageModule.Image();
            image.src = imageAsset;
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
        //console.log("take a pic");
    },

    uploadPicture() {
        let context = imagepicker.create({
				mode: 'multiple' 
			});

			context.authorize()
			.then(function() {
				return context.present();
			})
			.then(selection => {
				selection.forEach(selected => {
					
					console.log(JSON.stringify(selected));

					let img = new Image();
					img.src = selected;
					this.images.push(img);
				});
			}).catch(function (e) {
				console.log('error in selectPicture', e);
			});
        //console.log("get a pic");
    }
  },

  data() {
    return {
      dones: [],
      todos: [],
      textFieldValue: "",
      images: [],
    };
  },
}
</script>

<style scoped>
#active-task {
  font-size: 20;
  font-weight: bold;
  color: #53ba82;
  margin-left: 20;
  padding-top: 5;
  padding-bottom: 10;
}

#completed-task {
  font-size: 20;
  color: #d3d3d3;
  margin-left: 20;
  padding-top: 5;
  padding-bottom: 10;
  text-decoration: line-through;
}

.home-panel {
  vertical-align: center;
  font-size: 20;
  margin: 15;
}

.description-label {
  margin-bottom: 15;
}

TextField {
  font-size: 20;
  color: #53ba82;
  margin-top: 10;
  margin-bottom: 10;
  margin-right: 5;
  margin-left: 20;
}

Button { 
  font-size: 15; 
  font-weight: bold; 
  color: white; 
  background-color: #53ba82; 
  height: 40;
  margin-top: 10; 
  margin-bottom: 10; 
  margin-right: 10; 
  margin-left: 10; 
  border-radius: 20px; 
}
</style>