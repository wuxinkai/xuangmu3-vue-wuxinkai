 <template>
  <div>
      <q>双插槽 slot-b 组件: 对应插槽对应内容：父组件上用slot，子组件用name</q>
      <slot name="content"></slot>
      <slot name="title"></slot>
  </div>
</template>