import * as fs from 'fs';
import handlebars from 'handlebars';
import { setting_data } from './start.js';

export default function file_output(stock_code: string, file_index: number, datas: setting_data) {


  //ファイル読み込み
  const text = template_text();
  //    const templateSource = fs.readFileSync('./dist/template/template.hbs', 'utf8');
  const templateSource = text;
  const template = handlebars.compile(templateSource);

  //変数適用
  const data = {
    stock_code: stock_code,
    suggestedMax: datas.max,
    suggestedMin: datas.min,
    labels: datas.label,
    price: datas.price,
    next_file_index: file_index + 1,
    jikan: datas.time
  };
  const html = template(data);

  //出力
  try {
    fs.writeFileSync('./output/output_' + file_index + '.html', html);
    console.log('同期的にファイルに書き込みました。');
  } catch (err) {
    console.error('ファイルに書き込めませんでした:', err);
  }

}
function template_text(): string {
  return `
    <!DOCTYPE html>
    <html lang="ja">
    
    <head>
      <meta charset="utf-8">
    　<title>グラフ</title> 
    </head>
    <body>
      <h1>{{stock_code}} {{jikan}}</h1>
      <h1><a href="output_{{next_file_index}}.html">次へ</a></h1>
      <canvas id="myLineChart"></canvas>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js"></script>
      
      <script>
      var ctx = document.getElementById("myLineChart");
      var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [
            {{#each labels}}
            '{{this}}',
            {{/each}}
          ],
          datasets: [
            {
              label: '最高気温(度）',
              data: [
                {{#each price}}
                {{this}},
                {{/each}}
              ],
              borderColor: "rgba(255,0,0,1)",
              backgroundColor: "rgba(0,0,0,0)"
            },
          ]
        },
        options: {
          title: {
            display: true,
            text: '気温（8月1日~8月7日）'
          },
          scales: {
            yAxes: [{
              ticks: {
                suggestedMax: {{suggestedMax}},
                suggestedMin: {{suggestedMin}},
                stepSize: 10,
                callback: function(value, index, values){
                  return  value +  '度'
                }
              }
            }]
          },
        }
      });
      </script>
    </body>
    
    </html>

    `;
}