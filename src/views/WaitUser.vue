<template>
    <div>
        <h1>wait a few seconds</h1>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {

    computed:{
        ...mapState(["url", "user"])

    },
    methods: {
        async confirm_token(){
       let config = {
        params: {
            confirmation_token : this.$route.params.confirmation_token,
            user_id:  this.$route.params.user_id,
        }
       
       }
       try{

            let data = await axios.get(this.url + "confirm/", config)
            console.log(data);
                this.$router.push({name: "sign_in"})
           
    }
    catch(err){

        // alert(err)
        console.log(err);

        }
        
    }
        
    },
    mounted(){
        this.confirm_token()
    }

    
}

</script>
