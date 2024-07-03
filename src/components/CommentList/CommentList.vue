<template>
  <div :class="[colorY?'active':'','comment_list']" >
    <div class="content">
        <ul>
          <li v-for="comment in comments" :key="comment.commentId">
            <div class="pic"><img :src="comment.user.avatarUrl" alt="" /></div>
            <div class="comment">
              <div class="up">
                <div class="user">
                  <div class="name">
                    <div class="nickname">{{ comment.user.nickname }}</div>
                    <div
                      class="icon"
                      v-if="comment.user.vipRights?.associator?.iconUrl"
                    >
                      &nbsp;<img
                        :src="comment.user.vipRights?.associator?.iconUrl"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="time">
                    {{ fomateDate(comment.time, true) }}
                  </div>
                </div>
                <div class="zan">
                  <span class="num">{{ comment.likedCount }}</span>
                  <span class="iconfont icon-zan zanicon"></span>
                </div>
              </div>
              <div class="down" v-if="!comment.beReplied.length">
                {{ comment.content }}
              </div>
              <div class="downRe down" v-else>
                <div class="re">
                  回复 <span>@{{ comment.beReplied[0].user.nickname }}： </span>
                  {{ comment.content }}
                </div>
                <div class="origin">
                  @{{ comment.beReplied[0].user.nickname
                  }}{{ comment.beReplied[0].content }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { getDate } from '../../utills/comm'

export default {
  props: {
    comments: {
      type: Array

    },
    colorY: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    fomateDate (t, n) {
      return getDate(t, n)
    }
  }
}
</script>

<style lang="scss" scoped>
.comment_list{
  font-size: 15px;

  .content {
      ul {
        li {
          padding: 10px;
          display: flex;
          .pic {
            img {
              width: 30px;
              border-radius: 30px;
            }
          }
          .comment {
            flex: 1;
            padding-left: 10px;

            .up {
              display: flex;
              justify-content: space-between;
              .user {
                .name {
                  display: flex;

                  .nickname {
                    font-size: 14px;
                  }
                  .icon {
                    img {
                      width: 25px;
                      height: 10px;
                    }
                  }
                }
                .time {
                  color: #999;
                  font-size: 9px;
                }
              }
              .zan {
                font-size: 11px;
                color: #999;
                .num {
                  vertical-align: middle;
                }
                .zanicon {
                  display: inline-block;
                  vertical-align: middle;
                  margin-left: 4px;
                }
              }
            }
            .down{
              margin-top: 10px;
              word-break: break-all;
            }
            .downRe{
              .re{
                span{
                  color: rgba(16, 71, 153, 0.77);
                }
              }
              .origin{
                width: 370.4px;
                margin: 5px 0;
                padding: 10px;
                border: 1px solid rgba(0, 0, 0, .1);
                color:#888;
              }
            }
          }
        }
      }
    }
}
.active{
  color:white
}
</style>
