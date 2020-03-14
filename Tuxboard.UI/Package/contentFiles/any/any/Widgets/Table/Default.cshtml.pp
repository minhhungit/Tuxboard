@model $rootnamespace$.Widgets.Table.TableModel

<table class="table table-responsive table-striped table-bordered">
    <thead>
    <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Price</th>
    </tr>
    </thead>
    <tbody>
        @foreach (var product in Model.Products)
        {
            <tr>
                <td>@product.Id</td>
                <td>@product.Title</td>
                <td>@($"{product.Price:C}")</td>
            </tr>
        }
    </tbody>
</table>

