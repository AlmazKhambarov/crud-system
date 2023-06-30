import { createSlice } from "@reduxjs/toolkit";
import { Get_all_users, Get_saved_data, deletePosts, deleteSavedPost, getPostsComment, get_all_posts, get_all_postss, paginationQuery, savedDatas } from "../extraReducer";
import { useState } from "react";

const initialState = {
    loading: null,
    error: null,
    succsess: '',
    postsData: [],
    users: [],
    postCommentData: [],
    savedPosts: [],
    isSavedAction: '',
    padinationQuery: null,
    searchedvalue: "",
    selectedPostsData: [],
    postUser:[]
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        createPostRequest: (state, action) => {
            state.postUser = action.payload
        },
        deletePostReducer: (state, action) => {
            state.postsData = state.postsData.filter(el => el.id != action.payload)
            state.deleteAction = 'deleted'
        },
        paginations: (state, action) => {
            state.padinationQuery = 'succsess'
        },
        selectedPosts: (state, action) => {
            const { id, name,checked, body} = action.payload
            console.log(name)
            if (checked) {
                state.selectedPostsData.push({id:id, name:name, body:body});
            } else {
                state.selectedPostsData = state.selectedPostsData.filter((item) => item.id !== id)
            }
        },
        updatePosts: (state, action) => {
            const { id, body, name } = (action.payload)

            const existingData = state.postsData.find(el => el.id == id)
            if (existingData) {
                existingData.body = body
            }
            const existinguser = state.users.find(el => el.id == action.payload.userId)
            if (existinguser) {
                existinguser.username = action.payload.name
            }
        },
        searchvalue: (state, action) => {
            state.searchedvalue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_all_postss.pending, (state) => {
                state.loading = true;
            })
            .addCase(get_all_postss.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.postsData = payload;
            }).addCase(get_all_postss.rejected, (state, action) => {
                state.error = action.error.message;
            })
        builder
            .addCase(getPostsComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPostsComment.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.postCommentData = payload
            }).addCase(getPostsComment.rejected, (state, action) => {
                state.error = action.error.message;
            })
        builder
            .addCase(Get_all_users.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(Get_all_users.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.users = payload
            }).addCase(Get_all_users.rejected, (state, action) => {
                state.error = action.error.message
            })
        builder
            .addCase(Get_saved_data.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(Get_saved_data.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.savedPosts = payload
            }).addCase(Get_saved_data.rejected, (state, action) => {
                state.error = action.error.message
            })
        builder
            .addCase(savedDatas.pending, (state, action) => {
                state.loading = true;
                state.isSavedAction = 'pending'
            })
            .addCase(savedDatas.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isSavedAction = 'fulfiled'
            }).addCase(savedDatas.rejected, (state, action) => {
                state.error = action.error.message
            })
        builder
            .addCase(deleteSavedPost.pending, (state, action) => {
                state.loading = true;
                state.isSavedAction = 'pending'
            })
            .addCase(deleteSavedPost.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.isSavedAction = 'fulfiled'
            }).addCase(deleteSavedPost.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})
export const { paginationReducer, deletePostReducer, paginations, updatePosts, searchvalue, selectedPosts } = postsSlice.actions
export default postsSlice.reducer