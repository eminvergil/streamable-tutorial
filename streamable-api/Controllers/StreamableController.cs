using Microsoft.AspNetCore.Mvc;

namespace stremable_api.Controllers;

[ApiController]
[Route("[controller]")]
public class StreamableController : ControllerBase
{

    private readonly ILogger<StreamableController> _logger;

    public StreamableController(ILogger<StreamableController> logger)
    {
        _logger = logger;
    }

    [HttpGet, Route("get/stream")]
    public async Task GetStreamAsync()
    {

        Response.Headers.Add("Content-Type", "text/plain");
        Response.Headers.Add("Transfer-Encoding", "chunked"); // this is required to inform the client that you need to consume chunk by chunk

        for(var i=0; i <= 10; i++)
        {
            var chunk = $"This is chunk id:{i} \n";

            _logger.LogInformation($"Chunk count: {i}");

            var bytes = System.Text.Encoding.UTF8.GetBytes(chunk);

            await Response.Body.WriteAsync(bytes, 0, bytes.Length);
            await Response.Body.FlushAsync();
            await Task.Delay(1000);
        }



    }
}
