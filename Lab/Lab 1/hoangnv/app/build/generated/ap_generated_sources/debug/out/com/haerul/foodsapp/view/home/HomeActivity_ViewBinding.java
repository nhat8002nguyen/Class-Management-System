// Generated code from Butter Knife. Do not modify!
package com.haerul.foodsapp.view.home;

import android.view.View;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager.widget.ViewPager;
import butterknife.Unbinder;
import butterknife.internal.Utils;
import com.haerul.foodsapp.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class HomeActivity_ViewBinding implements Unbinder {
  private HomeActivity target;

  @UiThread
  public HomeActivity_ViewBinding(HomeActivity target) {
    this(target, target.getWindow().getDecorView());
  }

  @UiThread
  public HomeActivity_ViewBinding(HomeActivity target, View source) {
    this.target = target;

    target.viewPagerMeal = Utils.findRequiredViewAsType(source, R.id.viewPagerHeader, "field 'viewPagerMeal'", ViewPager.class);
    target.recyclerViewCategory = Utils.findRequiredViewAsType(source, R.id.recyclerCategory, "field 'recyclerViewCategory'", RecyclerView.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    HomeActivity target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.viewPagerMeal = null;
    target.recyclerViewCategory = null;
  }
}
