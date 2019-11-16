class APIResponse {
    constructor(request, data) {
        this.Request = {
            Request: request.request,
            Message: request.message,
            Status: request.status,
            Count: data.length
        }
        this.Data = data;
    }
}

module.exports = APIResponse;