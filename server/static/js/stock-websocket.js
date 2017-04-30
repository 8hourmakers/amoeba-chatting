$(function() {
    // When we're using HTTPS, use WSS too.
    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var ws_path = ws_scheme + '://' + window.location.host + '/ws/stock/favorite';
    console.log("Connecting to " + ws_path);
    var socket = new ReconnectingWebSocket(ws_path);

    socket.onmessage = function(message) {
        var data = JSON.parse(message.data);

        // if action is started, add new item to table
        if (data.action == "update_favorite_stock") {
            // TODO : Sort required
            var favorite_stock_item_list_html = "";
            for (var i = 0; i < data.favorite_stock_list_payload.length; i++) {
                var stock = data.favorite_stock_list_payload[i];
                favorite_stock_item_list_html += '<tr class="vertical-middle">';
                var detailUrl = "/details/" + stock.code;
                favorite_stock_item_list_html += '<td class="list-stockCode"><a href="'+detailUrl+'">' + stock.code + '</a></td>';
                favorite_stock_item_list_html += '<td class="list-stockName"><a href="'+detailUrl+'">' + stock.name + '</a></td>';
                favorite_stock_item_list_html += '<td class="list-currentPrice">' + stock.current_price + '</td>';
                favorite_stock_item_list_html += '<td class="list-fasteningStrength">' + stock.fastening_strength + '</td>';
                favorite_stock_item_list_html += '<td class="list-fasteningStrengthDiff">' + stock.fastening_strength_diff + '</td>';
                favorite_stock_item_list_html += '<td class="list-quantity">' + stock.quantity + '</td>';
                favorite_stock_item_list_html += '<td class="list-quantityYesterdayNowTime">' + stock.quantity_yesterday_now_time + '</td>';
                favorite_stock_item_list_html += '<td class="list-quantityYesterdayNowTimePercent">' + stock.quantity_yesterday_now_time_percent + ' %</td>';
                favorite_stock_item_list_html += '</tr>';
            }
            $(".favorite_stock_item_list").html(favorite_stock_item_list_html);
        }
    }
});
