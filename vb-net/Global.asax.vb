Imports System.Web.Mvc
Imports System.Web.Routing

Public Class MvcApplication
    Inherits System.Web.HttpApplication

    Shared Sub RegisterRoutes(routes As RouteCollection)
        routes.IgnoreRoute("{resource}.axd/{*pathInfo}")

        ' Default route
        routes.MapRoute(
            name:="Default",
            url:="{controller}/{action}/{id}",
            defaults:=New With {.controller = "Orders", .action = "Index", .id = UrlParameter.Optional}
        )
    End Sub

    Sub Application_Start()
        AreaRegistration.RegisterAllAreas()
        RegisterRoutes(RouteTable.Routes)
    End Sub
End Class
