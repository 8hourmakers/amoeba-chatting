$(function() {
    // When we're using HTTPS, use WSS too.
    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var ws_path = ws_scheme + '://' + window.location.host + '/ws/details/' + code;
    console.log("Connecting to " + ws_path);
    var socket = new ReconnectingWebSocket(ws_path);

    socket.onmessage = function(message) {
        var data = JSON.parse(message.data);
        if (data.action == "get_past_data_completed") {
            location.reload();
        }
        // if action is started, add new item to table
        if (data.action == "real_stock_item_tick") {

            $("#detail-current-price").text(data.current_price);
            $("#detail-total-price").text(data.total_price);
            $("#detail-fasteningStrength").text(data.fastening_strength);
            $("#detail-fasteningStrengthDiff").text(data.fastening_strength_diff);
            $("#detail-quantity").text(data.quantity);
            $("#detail-quantityYesterdayNowTime").text(data.quantity_yesterday_now_time);
            $("#detail-quantityYesterdayNowTimePercent").text(data.quantity_yesterday_now_time_percent + " %");

            var tickData = createTickData(data.timestamp, data.fastening_strength, data.fastening_strength_diff);
            today_data.push(tickData);
            console.log(tickData);
            var y_min = parseFloat(d3.min(today_data, function(d) { return d.fastening_strength_diff - 1 }));
                y_max = parseFloat(d3.max(today_data, function(d) { return d.fastening_strength_diff + 1 }));

            if(y_min < - 10) {
                y_min = -10
            }
            if(y_max > 10) {
                y_max = 10
            }
            x.domain(d3.extent(today_data, function(d) { return d.timestamp; }));
            y.domain(d3.extent(today_data, function(d) { return d.fastening_strength; }));
            y_diff.domain([y_min, y_max]);

            //var fastening_strength = d3.select(".fastening-strength").transition();

            fastening_strength.select(".x.axis").transition().duration(300)
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

            fastening_strength.select(".y.axis").transition().duration(300)
              .call(yAxis);

            fastening_strength.selectAll("path")
                .datum(today_data)
                .attr("class", "line red-line")
                .attr("d", line);

            // var fastening_strength_diff = d3.select(".fastening-strength-diff").transition();
            fastening_strength_diff.select(".x.axis").transition().duration(300)
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            fastening_strength_diff.select(".y.axis").transition().duration(300)
                .call(yAxis_diff);

            fastening_strength_diff.select(".centerline").transition().duration(300)
                .attr("transform", "translate(0," + y_diff(0) + ")")
                .call(centerLine);

            var bars = fastening_strength_diff.selectAll("bar")
                .data(today_data)
                .attr("x", function(d) { return x(d.timestamp); });

            bars.exit()
            .transition()
              .duration(300)
            .attr("y", y(0))
            .attr("height", function(d) { return Math.abs(y_diff(d.fastening_strength_diff_y) - y_diff(d.fastening_strength_diff_height)); })
            .style('fill-opacity', 1e-6)
            .remove();

            // data that needs DOM = enter() (a set/selection, not an event!)
            bars.enter().append("rect")
            .attr("class", "bar")
            .attr("y", function(d) { return y_diff(d.fastening_strength_diff_y); })
            .attr("height", function(d) { return Math.abs(y_diff(d.fastening_strength_diff_y) - y_diff(d.fastening_strength_diff_height)); })

            // the "UPDATE" set:
            bars.transition().duration(300)
                .attr("x", function(d) { return x(d.timestamp); })
                .attr("width", ".2em")
                .attr("y", function(d) { return y_diff(d.fastening_strength_diff_y); })
                .attr("height", function(d) { return Math.abs(y_diff(d.fastening_strength_diff_y) - y_diff(d.fastening_strength_diff_height)); })

        }
                // .enter().append("rect")
                // .attr("x", function(d) { return x(d.timestamp); })
                // .attr("width", ".2em")
                // .attr("y", function(d) { return y_diff(d.fastening_strength_diff_y); })
                // .attr("height", function(d) { return Math.abs(y_diff(d.fastening_strength_diff_y) - y_diff(d.fastening_strength_diff_height)); })
                // .style("fill", function(d) { return d.fastening_strength_diff_color });
    };

});

var createTickData = function(timestamp, fastening_strength, fastening_strength_diff) {
    if(fastening_strength_diff >= 0) {
        return {
            timestamp: parseTime(timestamp),
            fastening_strength: +fastening_strength,
            fastening_strength_diff: +fastening_strength_diff,
            fastening_strength_diff_y: +fastening_strength_diff,
            fastening_strength_diff_height: 0,
            fastening_strength_diff_color: "red"
        }
    }
    else {
        return {
            timestamp: parseTime(timestamp),
            fastening_strength: +fastening_strength,
            fastening_strength_diff: +fastening_strength_diff,
            fastening_strength_diff_y: 0,
            fastening_strength_diff_height: +fastening_strength_diff,
            fastening_strength_diff_color: "blue"
        }
    }
}