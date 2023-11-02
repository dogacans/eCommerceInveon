using Inveon.Web.Models;
using Inveon.Web.Services.IServices;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Inveon.Web.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class YoneticiController : Controller
    {
        private readonly ILogger<YoneticiController> _logger;
        private readonly IProductService _productService;

        public YoneticiController(ILogger<YoneticiController> logger, IProductService productService)
        {
            _logger = logger;
            _productService = productService;
        }

        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> Git()
        {
            List<ProductDto> list = new();
            var response = await _productService.GetAllProductsAsync<ResponseDto>("");
            if (response != null && response.IsSuccess)
            {
                list = JsonConvert.DeserializeObject<List<ProductDto>>(Convert.ToString(response.Result));
            }
            return View(list);
        }
        public IActionResult AdminLogout()
        {
            return SignOut("Cookies", "oidc");
        }
    }
}
