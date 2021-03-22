import Repository from "@/repositories/Repository";

export default {
    integration() {
        return Repository.post('/google')
    },

    // Payloads: google code, user token (PASSPORT)
    integrationCallback(payload) {
        return Repository.post('/google-callback', payload)
    },

    disconnect() {
        return Repository.post('/google/disconnect')
    },

    fetchFolders() {
        return Repository.get('/drive/list-of-folders');
    },

    export(payload) {
        return Repository.post('/drive/upload-file', {
            folder_id: payload.folderID,
            assignment_id: payload.assignmentID
        })
    },
}
