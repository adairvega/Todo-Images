<template>
    <Page>
        <ActionBar title="YOUR APP"></ActionBar>

        <StackLayout>
            <Label class="body m-20" :text="message" textWrap="true"></Label>
            <Button class="btn btn-primary" text="Log out" @tap="logout"></Button>
        </StackLayout>
    </Page>
</template>

<script>
    import Home from "./Home";

    export default {
        data() {
            return {
                message: "You have successfully authenticated. This is where you build your core application functionality."
            };
        },
        methods: {
            logout() {
                this.$backendService.logout();
                this.$navigateTo(Home, {
                    clearHistory: true
                });
            }
        }
    };
</script>

<style>
</style>
