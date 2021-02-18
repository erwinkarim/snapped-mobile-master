import StudentRepository from "@/repositories/StudentRepository";
import AuthenticationRepository from "@/repositories/AuthenticationRepository";
import axios from "axios";


export default {
    namespaced: true,
    state: () => ({
        schoolRankings: {
            data: [],
            meta: null,
            filters: {
                pageNum: 1,
                perPage: 20,
                search: ''
            },
            infiniteScrollIdentifier: 0
        },
        nationalRankings: {
            data: [],
            meta: null,
            filters: {
                pageNum: 1,
                perPage: 20,
                search: ''
            },
            infiniteScrollIdentifier: 0
        }

    }),
    mutations: {
        test(state, payload) {

        },
    },
    actions: {
        handleSchoolRankingData({state, commit, getters, dispatch}) {

            return new Promise((resolve, reject) => {

                if (getters.hasMoreSchoolRankingData) {

                    StudentRepository.getBatchRanking(state.schoolRankings.filters)
                        .then(response => {

                            let data = response.data;

                            if (data.success) {

                                // Append ranking to array
                                data.data.forEach((test) => {
                                    state.schoolRankings.data.push(test)
                                })

                                // Update meta details and pageNum for filters
                                state.schoolRankings.meta = data.meta;
                                state.schoolRankings.filters.pageNum = state.schoolRankings.meta.current_page + 1;

                                resolve('loaded')
                            } else {
                                resolve('completed')
                            }
                        })
                } else {
                    resolve('completed')
                }

            })
        },
        handleNationalRankingData({state, commit, getters, dispatch}) {

            return new Promise((resolve, reject) => {

                if (getters.hasMoreNationalRankingData) {

                    StudentRepository.getNationalRanking(state.nationalRankings.filters)
                        .then(response => {

                            let data = response.data;

                            if (data.success) {

                                // Append ranking to array
                                data.data.forEach((test) => {
                                    state.nationalRankings.data.push(test)
                                })

                                // Update meta details and pageNum for filters
                                state.nationalRankings.meta = data.meta;
                                state.nationalRankings.filters.pageNum = state.nationalRankings.meta.current_page + 1;

                                resolve('loaded')
                            } else {
                                resolve('completed')
                            }


                        })
                } else {
                    resolve('completed')
                }

            })
        }

    },
    getters: {

        hasMoreSchoolRankingData: (state) => {
            if (state.schoolRankings.meta) {
                return state.schoolRankings.filters.pageNum <= state.schoolRankings.meta.last_page
            } else {
                return true;
            }
        },
        hasMoreNationalRankingData: (state) => {
            if (state.nationalRankings.meta) {
                return state.nationalRankings.filters.pageNum <= state.nationalRankings.meta.last_page
            } else {
                return true;
            }
        },

    }
}
