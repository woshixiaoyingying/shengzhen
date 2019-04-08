<template>
    <table  class="table">
        <thead>
            <tr>
                <th>用户名</th>
                <th>姓名</th>
                <th>直推会员数</th>
                <th>直推一代数</th>
                <th>本月消费</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{memberData.name}}</td>
                <td>{{memberData.real_name}}</td>
                <td>{{memberData.first_generation}}</td>
                <td>{{memberData.second_generation}}</td>
                <td>{{memberData.total_money}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  name: "VContent",
  props: ["memberData"]

};
</script>
<style lang="scss" scoped src="@/huizhongtangWebStatic/css/common.scss"></style>
<style scoped lang="scss">
.table{
    width: calc(100% - 20px);
    margin: 10px;
    background-color: #fff;
    border: 1px solid #f5f5f5;
    border-collapse: collapse
}
.table thead{
    font-size: 14px;
    font-weight: 500;
    color: #000;
}
.table tbody{
    font-size: 12px;
}
.table th,.table td{
    text-align: center;
    padding: 10px 0;
    border: 1px solid #f5f5f5;
}
</style>