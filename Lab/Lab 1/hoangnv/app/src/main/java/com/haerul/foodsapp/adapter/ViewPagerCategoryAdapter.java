/*-----------------------------------------------------------------------------
 - Developed by Haerul Muttaqin                                               -
 - Last modified 3/24/19 12:40 PM                                             -
 - Subscribe : https://www.youtube.com/haerulmuttaqin                         -
 - Copyright (c) 2019. All rights reserved                                    -
 -----------------------------------------------------------------------------*/
package com.haerul.foodsapp.adapter;

import android.os.Bundle;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;
import com.haerul.foodsapp.model.Categories;
import com.haerul.foodsapp.view.category.CategoryFragment;
import java.util.List;

public class ViewPagerCategoryAdapter extends FragmentPagerAdapter {

  private List<Categories.Category> categories;

  public ViewPagerCategoryAdapter(FragmentManager fm, List<Categories.Category> categories) {
    super(fm);
    this.categories = categories;
  }

  @Override
  public Fragment getItem(int i) {
    CategoryFragment fragment = new CategoryFragment();
    Bundle args = new Bundle();
    args.putString("EXTRA_DATA_NAME", categories.get(i).getStrCategory());
    args.putString("EXTRA_DATA_DESC", categories.get(i).getStrCategoryDescription());
    args.putString("EXTRA_DATA_IMAGE", categories.get(i).getStrCategoryThumb());
    fragment.setArguments(args);
    return fragment;
  }

  @Override
  public int getCount() {
    return categories.size();
  }

  @Nullable
  @Override
  public CharSequence getPageTitle(int position) {
    return categories.get(position).getStrCategory();
  }
}
