// Generated code from Butter Knife. Do not modify!
package com.haerul.foodsapp.view.category;

import android.view.View;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import androidx.appcompat.widget.Toolbar;
import androidx.viewpager.widget.ViewPager;
import butterknife.Unbinder;
import butterknife.internal.Utils;
import com.google.android.material.tabs.TabLayout;
import com.haerul.foodsapp.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class CategoryActivity_ViewBinding implements Unbinder {
  private CategoryActivity target;

  @UiThread
  public CategoryActivity_ViewBinding(CategoryActivity target) {
    this(target, target.getWindow().getDecorView());
  }

  @UiThread
  public CategoryActivity_ViewBinding(CategoryActivity target, View source) {
    this.target = target;

    target.toolbar = Utils.findRequiredViewAsType(source, R.id.toolbar, "field 'toolbar'", Toolbar.class);
    target.tabLayout = Utils.findRequiredViewAsType(source, R.id.tabLayout, "field 'tabLayout'", TabLayout.class);
    target.viewPager = Utils.findRequiredViewAsType(source, R.id.viewPager, "field 'viewPager'", ViewPager.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    CategoryActivity target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.toolbar = null;
    target.tabLayout = null;
    target.viewPager = null;
  }
}
