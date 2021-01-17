<template>
  <dashboard-layout
      :has-fixed-header="true"
  >

    <template v-slot:pageHeader>
      <page-header-three
          :has-bottom-border="true"
          :has-search-bar="true"
          @search="handleSearch"
      >
        <template v-slot:leftAction>
          <nav-back class="w-2/7" stroke-color="red-primary"/>
        </template>
        <template v-slot:mini-title>
          School Ranking
        </template>
      </page-header-three>
    </template>


    <template v-slot:content>
      <div class="relative h-40 top-45 md:mt-10 px-5 w-full">

        <div v-for="(student, index) in rankings"
             :key="student.id"
             class="mb-3 w-full rounded rounded-xl overflow-hidden bg-gray-secondary flex flex-row pl-1">

          <div class="flex flex-row w-3/12 items-center">
            <!-- Ranking -->
            <div :class="student.ranking === 1 ? 'items-start' : 'justify-center px-2'"
                 class=" flex flex-col w-3/7 h-full text-center mr-1 ">

              <icon-base-two v-if="student.ranking === 1" class="w-full">
                <gold-medal-icon/>
              </icon-base-two>

              <div v-else class="font-bold text-3xl">
                {{ student.ranking }}
              </div>
            </div>

            <!-- Student photo -->
            <icon-base-two class="w-3/7">
              <profile-photo/>
            </icon-base-two>
          </div>

          <div class="flex w-6/12 py-3">

            <!-- Student Details -->
            <div class="flex flex-col w-full justify-between">
              <div>
                <div class="text-left text-purple-primary text-xs-plus font-bold  truncate  pr-5">
                  {{ student.student_name }}
                </div>

                <div class="text-left text-purple-secondary text-px-10 truncate mt-2 pr-5">
                  {{ student.class_name }}
                </div>
              </div>
            </div>
          </div>

          <div class="w-3/12 flex flex-col justify-center font-semibold text-sm text-right pr-5 md:text-lg ">
            {{ `${student.marks_average}%` }}
          </div>
        </div>

        <infinite-loading :identifier="filterCount"
                          @infinite="handleInfiniteScroll"
                          spinner="bubbles"
                          force-use-infinite-wrapper
        >
          <div slot="spinner" class="mt-10">Loading...</div>
          <div slot="no-more"></div>
          <div slot="no-results">No results message</div>
        </infinite-loading>
      </div>
    </template>

  </dashboard-layout>
</template>

<script>
import LayoutTwo from "@/views/students/StudentClass/Components/LayoutTwo";
import IconBaseTwo from "@/components/IconBaseTwo";
import ProfilePhoto from "@/components/icons/ProfilePhoto";
import GoldMedalIcon from "@/components/icons/GoldMedalIcon";
import StudentRepository from "@/repositories/StudentRepository";
import ListResponseBar from "@/components/ListResponseBar";
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";
import FilterIcon from "@/components/icons/FilterIcon";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "SchoolRanking",
  data() {
    return {

      // states
      error: null,
      loading: false,
      awaitingSearch: false,

      filterCount: 0,
      filters: {
        pageNum: 1,
        perPage: 20,
        search: ''
      },

      rankings: [],
      meta: null
    }
  },
  computed: {
    hasLoadMore() {
      if (this.meta) {
        return this.filters.pageNum <= this.meta.last_page
      } else {
        return true;
      }
    }
  },
  methods: {
    handleInfiniteScroll($state) {

      if (this.hasLoadMore) {
        StudentRepository.getBatchRanking(this.filters)
            .then(response => {

              let data = response.data;

              // Append ranking to array
              data.data.forEach((test) => {
                this.rankings.push(test)
              })

              // Update meta details and pageNum for filters
              this.meta = data.meta;
              this.filters.pageNum = this.meta.current_page + 1;

              $state.loaded();
            })
      } else {
        $state.complete();
      }
    },

    handleSearch(value) {
      this.filters.search = value;

      if (!this.awaitingSearch) {
        setTimeout(() => {
          this.awaitingSearch = false;
          this.updateFilter();
        }, 1000); // 1 sec delay
      }
      this.awaitingSearch = true;
    },
    updateFilter() {
      this.filters.pageNum = 1
      this.filters.perPage = 20

      this.rankings = [];
      this.filterCount++;
    }
  },
  components: {
    FilterIcon,
    NavBack,
    PageHeaderThree, DashboardLayout, ListResponseBar, GoldMedalIcon, ProfilePhoto, IconBaseTwo, LayoutTwo,
    InfiniteLoading
  }
}
</script>

<style scoped>

</style>
