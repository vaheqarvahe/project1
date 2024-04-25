<template>
    <div>
        <AddUpdate :total ="total_info" edit="edit" />
    </div>

</template>


<script>
import AddUpdate from '@/components/AddUpdate.vue';
import { mapActions, mapState } from 'vuex';
export default {
    components:{AddUpdate},
    methods: {
        ...mapActions(["get_one_film"]),  
},
computed:{
    ...mapState(["one_film"]),
    total_info(){
        let a = {...this.one_film}
        console.log(a, "barev");
        a.genre= a?.genre?.map(elm=>elm.id)
        return a
    }
},
      mounted(){
         this.get_one_film(this.$route.params.id)
    }
}



</script>