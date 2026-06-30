export function getTestConnection(req, res) {
    res.json({
        success: true,
        message: "Connection test success!"
    });
}